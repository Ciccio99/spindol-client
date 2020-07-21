import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import moment from 'moment-timezone';
import DailyDiaryServices from 'services/DailyDiaryServices';
import ToggleButtonGroup from 'components/buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from 'components/buttons/toggleButton/ToggleButton';
import UserContext from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import PanelModule from 'components/organizers/PanelModule';

const TITLE = 'How are you feeling today?';

const MoodModule = () => {
  const { user } = useContext(UserContext);
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [dailyDiary, setDailyDiary] = useState();
  const [reportingStreak, setReportingStreak] = useState(0);
  const [todayDate] = useState(moment().startOf('day'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await DailyDiaryServices.query({
          date: todayDate.format('YYYY-MM-DD'),
        }, { date: 'desc' }, 1);
        if (data.length > 0) {
          setDailyDiary(data[0]);
        }
      } catch (error) {
        dispatchAlertSystem({
          type: 'WARNING',
          message: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatchAlertSystem, user, todayDate]);

  useEffect(() => {
    (async () => {
      const streak = await DailyDiaryServices.getReportingStreak();
      setReportingStreak(streak);
    })();
  }, [dailyDiary]);

  const submitDailyDiary = (mood) => {
    const initMood = dailyDiary?.mood;

    // Optimistic Update
    setDailyDiary((prevState) => ({ ...prevState, mood }));

    (async () => {
      const { data, error } = await DailyDiaryServices.upsert(todayDate.format('YYYY-MM-DD'), mood);
      if (data) {
        setDailyDiary(data);
        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Mood Updated!',
        });
      } else if (error) {
        setDailyDiary((prevState) => ({ ...prevState, mood: initMood }));
        dispatchAlertSystem({
          type: 'WARNING',
          message: error.message,
        });
      }
    })();
  };

  if (isLoading) {
    return (
      <PanelModule title={TITLE} subtitle={todayDate.format('MMMM DD, YYYY')}>
        <Box overflow="none">
          <LinearProgress color="secondary"/>
        </Box>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={TITLE} subtitle={todayDate.format('MMMM DD, YYYY')}>
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        {
          reportingStreak > 0
          && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Box px={2} py={1} mr={1} display="inline" borderRadius={5} style={{backgroundColor: '#FAC856', color:'#FFFFFF'}}>
                  <Typography variant="subtitle2" display="inline"><strong>{`${reportingStreak} Day Streak`}</strong></Typography>
                </Box>
                <Box py={1}>
                  <Typography variant="subtitle2" display="inline">{' 🔥 Keep it up, you\'re doing great!'}</Typography>
                </Box>
              </Box>

            </Grid>
          )
        }

        <ToggleButtonGroup item container xs={12} sm={12} spacing={1} alignItems="center" justify="space-between" onChange={submitDailyDiary} value={dailyDiary ? dailyDiary.mood : null}>
          <ToggleButton value="excellent" xs={6} sm={2}>Excellent</ToggleButton>
          <ToggleButton value="good" xs={6} sm={2}>Good</ToggleButton>
          <ToggleButton value="meh" xs={6} sm={2}>Meh</ToggleButton>
          <ToggleButton value="bad" xs={6} sm={2}>Bad</ToggleButton>
          <ToggleButton value="awful" xs={6} sm={2}>Awful</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </PanelModule>
  );
};

export default MoodModule;

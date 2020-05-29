import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import DailyDiaryServices from 'services/DailyDiaryServices';
import ToggleButtonGroup from 'components/buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from 'components/buttons/toggleButton/ToggleButton';
import UserContext from 'context/userContext';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './DailyDiaryPanel.module.css';

const DailyDiaryPanel = () => {
  const { user } = useContext(UserContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [dailyDiary, setDailyDiary] = useState();
  const [reportingStreak, setReportingStreak] = useState(0);
  const todayDate = moment().startOf('day');

  useEffect(() => {
    (async () => {
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
      }
    })();
  }, [dispatchAlertSystem, user]);

  useEffect(() => {
    (async () => {
      const streak = await DailyDiaryServices.getReportingStreak();
      setReportingStreak(streak);
    })();
  }, [dailyDiary]);

  const submitDailyDiary = async (mood) => {
    const data = await DailyDiaryServices.upsert(todayDate.format('YYYY-MM-DD'), mood);
    if (data) {
      setDailyDiary(data);
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Mood Updated!',
      });
      return true;
    }
    dispatchAlertSystem({
      type: 'WARNING',
      message: 'Failed to update Mood. Please try again later.',
    });
    return false;
  };

  return (
    <Paper elevation={0}>
      <Box mb={3} p={3} overflow="none">
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item container xs={12} sm={9} alignItems="baseline" spacing={2}>
            <Grid item>
              <Typography variant="h6">How are you feeling today?</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{todayDate.format('MMM D, YYYY')}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Logging Streak: {reportingStreak}</Typography>
          </Grid>
          <ToggleButtonGroup item container xs={12} sm={12} spacing={1} alignItems="center" justify="space-between" onChange={submitDailyDiary} value={dailyDiary ? dailyDiary.mood : null}>
            <ToggleButton value="excellent" xs={6} sm={2}>Excellent</ToggleButton>
            <ToggleButton value="good" xs={6} sm={2}>Good</ToggleButton>
            <ToggleButton value="meh" xs={6} sm={2}>Meh</ToggleButton>
            <ToggleButton value="bad" xs={6} sm={2}>Bad</ToggleButton>
            <ToggleButton value="awful" xs={6} sm={2}>Awful</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DailyDiaryPanel;

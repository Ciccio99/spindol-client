import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  LinearProgress,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Select,
  Divider,
} from '@material-ui/core';

import moment from 'moment-timezone';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import DailyDiaryServices from 'services/DailyDiaryServices';
import styles from './DailyDiaryDetailsPanel.module.css';
import SleepSummaryPanel from './sleepSummaryPanel/SleepSummaryPanel';
import SleepTrialTrackerMin from './sleepTrialTrackerMin/SleepTrialTrackerMin';
import Section from 'components/organizers/Section';
import FatigueModule from 'components/modules/FatigueModule';
import SleepComparisonModule from 'components/modules/SleepComparisonModule';
import MoodSelectModule from 'components/modules/MoodSelectModule';
import DailyDiaryDashboardModule from 'components/modules/DailyDiaryDashboardModule';
import CurrentTrialsModule from 'components/modules/CurrentTrialsModule';
import useMedium from 'hooks/useMedium';

const MOOD_COLOR = {
  excellent: styles.excellent,
  good: styles.good,
  meh: styles.meh,
  bad: styles.bad,
  awful: styles.awful,
};

const DailyDiaryDetailsPanel = ({ selectedDate }) => {
  const { isMedium } = useMedium();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [dailyDiary, setDailyDiary] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);
      const dd = await DailyDiaryServices.getByDate(selectedDate);
      if (!dd) {
        dispatchAlertSystem({
          type: 'WARNING',
          message: 'No Daily Diary check-ins available yet.',
        });
        setLoading(false);
        setDailyDiary();
        return;
      }
      if (!didCancel) {
        setDailyDiary(dd);
      }
      setLoading(false);
    })();
    return () => { didCancel = true; };
  }, [dispatchAlertSystem, selectedDate]);

  const handleUpdateMood = async (e) => {
    const mood = e.target.value;
    const initMood = dailyDiary?.mood;

    setDailyDiary((prevState) => ({ ...prevState, mood }));

    const { data, error } = await DailyDiaryServices.upsert(moment.utc(dailyDiary.date).format('YYYY-MM-DD'), mood);
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
  };

  if (loading) {
    return <LinearProgress color="primary" />;
  }
  if (!dailyDiary) {
    return null;
  }

  return (
    <>
      <Section>
        <DailyDiaryDashboardModule date={selectedDate} />
      </Section>
      <Section>
        <CurrentTrialsModule date={selectedDate} />
      </Section>
      <Section>
        <Grid container>
          <Grid component={Grid} item xs={12} md={6}>
            <Box mr={isMedium ? 0 : 4}>
              <SleepComparisonModule date={selectedDate}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mt={isMedium ? 8 : 0} height={isMedium ? 'auto' : '100%'}>
              <FatigueModule date={selectedDate}/>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </>
  );
};

export default DailyDiaryDetailsPanel;

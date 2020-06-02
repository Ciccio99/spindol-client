import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
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
import AlertSystemContext from '../../context/alertSystemContext';
import DailyDiaryServices from '../../services/DailyDiaryServices';
import styles from './DailyDiaryDetailsPanel.module.css';
import SleepSummaryPanel from './sleepSummaryPanel/SleepSummaryPanel';
import SleepTrialTrackerMin from './sleepTrialTrackerMin/SleepTrialTrackerMin';

const MOOD_COLOR = {
  excellent: styles.excellent,
  good: styles.good,
  meh: styles.meh,
  bad: styles.bad,
  awful: styles.awful,
};

const DailyDiaryDetailsPanel = ({ selectedDate }) => {
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [dailyDiary, setDailyDiary] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      setDailyDiary(dd);
      setLoading(false);
    })();
  }, [dispatchAlertSystem, selectedDate]);

  const handleUpdateMood = async (e) => {
    const mood = e.target.value;
    const data = await DailyDiaryServices.upsert(moment.utc(dailyDiary.date).format('YYYY-MM-DD'), mood);
    if (data) {
      setDailyDiary(data);
      return true;
    }
    return false;
  };

  if (loading) {
    return <LinearProgress color="primary" />;
  } if (!dailyDiary) {
    return null;
  }

  return (
    <Paper elevation={24}>
      <Box px={4} py={3}>
        <Typography variant="h4" color="secondary">{moment.utc(dailyDiary.date).format('dddd - MMM DD, YYYY')}</Typography>
      </Box>
      <Divider />
      <Box p={4}>
        <Typography variant="h6">Mood</Typography>
        <Box className={styles.panel} p={3} mt={2} border={1} borderColor="#CCC" borderRadius={25}>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              {
              dailyDiary.mood
                ? (
                  <Typography variant="h6">
                    {'You felt '}
                    <span className={MOOD_COLOR[dailyDiary.mood]}>{dailyDiary.mood}</span>
                    {' '}
                    on this day.
                  </Typography>
                )
                : <Typography variant="h6">No mood set for this day...</Typography>
            }
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl variant="outlined" fullWidth color="secondary" size="medium">
                <InputLabel htmlFor="mood-select">Edit Mood</InputLabel>
                <Select
                  labelId="mood-select"
                  value={dailyDiary.mood || ''}
                  label="Edit Mood"
                  onChange={handleUpdateMood}
                  classes={{ root: styles.root }}
                >
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="meh">Meh</MenuItem>
                  <MenuItem value="bad">Bad</MenuItem>
                  <MenuItem value="awful">Awful</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box mt={8}>
          <Typography variant="h6">Sleep Details</Typography>
        </Box>
        <Box mt={2}>
          {
        !dailyDiary.sleepSummary
          ? <Typography>No sleep data available for this day...</Typography>
          : <SleepSummaryPanel sleepSummary={dailyDiary.sleepSummary} />

      }
        </Box>

        <Box mt={8}>
          <Typography variant="h6">Sleep Trial Trackers</Typography>
        </Box>
        <Box mt={2} mb={6}>
          {
        dailyDiary.sleepTrialTrackers.length === 0
          ? <Typography>No Sleep Trials were being tracked for this day...</Typography>
          : dailyDiary.sleepTrialTrackers.map((stt) => <SleepTrialTrackerMin key={stt._id} sleepTrialTracker={stt} date={selectedDate} />)

      }
        </Box>
      </Box>
    </Paper>
  );
};

export default DailyDiaryDetailsPanel;

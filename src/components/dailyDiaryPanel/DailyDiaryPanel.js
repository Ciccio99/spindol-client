import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import ToggleButtonGroup from '../buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from '../buttons/toggleButton/ToggleButton';
import DailyDiaryServices from '../../services/DailyDiaryServices';
import UserContext from '../../context/userContext';
import styles from './DailyDiaryPanel.module.css';
import AlertSystemContext from '../../context/alertSystemContext';

const DailyDiaryPanel = () => {
  const { user } = useContext(UserContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [dailyDiary, setDailyDiary] = useState();
  const todayDate = moment().startOf('day');

  useEffect(() => {
    async function fetchData() {
      const todayDate = moment().startOf('day');
      try {
        const data = await DailyDiaryServices.query({
          date: todayDate.format('YYYY-MM-DD'),
        }, { date: 'desc' }, 1);
        if (data.length > 0) {
          setDailyDiary(data[0]);
        }
      } catch (error) {
        dispatchAlertSystem({
          type:'WARNING',
          message: error.response.data.message,
        })
      }
    }
    fetchData();
  }, [dispatchAlertSystem, user]);

  const submitDailyDiary = async (mood) => {
    const data = await DailyDiaryServices.upsert(todayDate.format('YYYY-MM-DD'), mood);
    if (data) {
      setDailyDiary(data);
      return true;
    }
    return false;
  }

  return (
    <Box className={styles.panel} boxShadow={0} borderRadius={10} mb={3} p={3}>
      <Grid container justify='space-between' alignItems='center' spacing={2}>
        <Grid item container xs={12} sm={12} alignItems='baseline' spacing={2}>
          <Grid item>
            <Typography variant='h6'>How are you feeling today?</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{todayDate.format('MMM D, YYYY')}</Typography>
          </Grid>
        </Grid>
        <ToggleButtonGroup item container xs={12} sm={12} spacing={1} alignItems='center' justify='space-between' onChange={submitDailyDiary} value={dailyDiary ? dailyDiary.mood : null}>
          <ToggleButton value='excellent' xs={6} sm={2}>Excellent</ToggleButton>
          <ToggleButton value='good' xs={6} sm={2}>Good</ToggleButton>
          <ToggleButton value='meh' xs={6} sm={2}>Meh</ToggleButton>
          <ToggleButton value='bad' xs={6} sm={2}>Bad</ToggleButton>
          <ToggleButton value='awful' xs={6} sm={2}>Awful</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Box>
  );
}

export default DailyDiaryPanel;

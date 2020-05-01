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

const DailyDiaryPanel = () => {
  const { user } = useContext(UserContext);
  const [dailyDiary, setDailyDiary] = useState();
  const todayDate = moment().startOf('day');

  useEffect(() => {
    async function fetchData() {
      const todayDate = moment().startOf('day');
      const data = await DailyDiaryServices.query({
        date: todayDate.format('YYYY-MM-DD'),
        owner: user._id,
      }, { date: 'desc' }, 1);
      if (data.length > 0) {
        setDailyDiary(data[0]);
      }
    }
    fetchData();
  }, [user]);

  const submitDailyDiary = async (mood) => {
    const data = await DailyDiaryServices.upsert(user, todayDate.format('YYYY-MM-DD'), mood);
    if (data) {
      setDailyDiary(data);
    }
  }

  return (
    <Box className={styles.panel} boxShadow={0} borderRadius={10} mb={3} p={3}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={12} sm={5}>
          <Typography variant='h6'><span role='img' aria-label='Thinking Face Emoji'>🤔</span> How are you feeling today?</Typography>
        </Grid>
        <Grid item container xs={12} sm={7} spacing={1} justify='space-around' alignItems='center'>
          <Grid item className={styles.buttonContainer}>
            <ToggleButtonGroup onChange={submitDailyDiary} value={dailyDiary ? dailyDiary.mood : null}>
              <ToggleButton value='awful'>Awful</ToggleButton>
              <ToggleButton value='bad'>Bad</ToggleButton>
              <ToggleButton value='meh'>Meh</ToggleButton>
              <ToggleButton value='good'>Good</ToggleButton>
              <ToggleButton value='excellent'>Excellent</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DailyDiaryPanel;

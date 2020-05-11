import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';

import moment from 'moment-timezone';
import DailyDiaryServices from '../../services/DailyDiaryServices';
import ToggleButtonGroup from '../buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from '../buttons/toggleButton/ToggleButton';
import styles from './DailyDiaryCheckIn.module.css';

const MOOD_ICON = {
  'excellent': <SentimentVerySatisfied htmlColor='#5EBC88' fontSize='medium'/>,
  'good': <SentimentSatisfiedAlt htmlColor='#B0D25A' fontSize='medium'/>,
  'meh': <SentimentSatisfied htmlColor='#FFC929' fontSize='medium'/>,
  'bad': <SentimentDissatisfied htmlColor='#F68B3B' fontSize='medium'/>,
  'awful': <SentimentVeryDissatisfied htmlColor='#DF1D3D' fontSize='medium'/>,
};

const MOOD_COLOR = {
  'excellent': styles.excellent,
  'good': styles.good,
  'meh': styles.meh,
  'bad': styles.bad,
  'awful': styles.awful,
};

const DailyDiaryCheckIn = ({ dailyDiary }) => {
  const submitDailyDiary = async (mood) => {
    // const data = await DailyDiaryServices.upsert(user, todayDate.format('YYYY-MM-DD'), mood);
    // if (data) {
    //   setDailyDiary(data);
    //   return true;
    // }
    // return false;
  }


  return (
    <Box boxShadow={0} className={styles.panel} borderRadius={10} p={1} mb={3}>
      <Typography variant='subtitle2'>{moment(dailyDiary.date).utc().format('dddd MMM D, YYYY')}</Typography>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Typography variant='h6'>You felt <span className={MOOD_COLOR[dailyDiary.mood]}>{dailyDiary.mood}</span> on this day.</Typography>
        </Grid>
      </Grid>

          {/* <Box className={styles.panel} p={1} borderRadius={10}>
          <Grid  container alignContent='center' alignItems='center'>
            <Grid item>{MOOD_ICON[dailyDiary.mood]}</Grid>
            <Grid item>
              <Typography variant='h4'>{dailyDiary.mood}</Typography>
            </Grid>
          </Grid>
          </Box> */}
        {/* <ToggleButtonGroup item container xs={12} sm={12} spacing={1} alignItems='center' justify='space-between' onChange={submitDailyDiary} value={dailyDiary ? dailyDiary.mood : null}>
          <ToggleButton value='awful' xs={6} sm={2}>Awful</ToggleButton>
          <ToggleButton value='bad' xs={6} sm={2}>Bad</ToggleButton>
          <ToggleButton value='meh' xs={6} sm={2}>Meh</ToggleButton>
          <ToggleButton value='good' xs={6} sm={2}>Good</ToggleButton>
          <ToggleButton value='excellent' xs={6} sm={2}>Excellent</ToggleButton>
        </ToggleButtonGroup> */}
    </Box>
  );
};

export default DailyDiaryCheckIn;

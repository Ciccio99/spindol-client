import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Helmet } from 'react-helmet-async';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import Section from 'components/organizers/Section';
import DailyDiaryDetailsPanel from 'components/dailyDiaryDetailsPanel/DailyDiaryDetailsPanel';
import styles from './CheckInsView.module.css';

const CheckInsView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  const handleBackClick = () => {
    setSelectedDate((prevDate) => moment(prevDate).subtract(1, 'day'));
  };

  const handleForwardClick = () => {
    setSelectedDate((prevDate) => {
      const newDate = moment(prevDate).add(1, 'day');
      if (newDate.isAfter(moment(), 'day')) {
        return prevDate;
      }
      return newDate;
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Hypnos.ai - Daily Diary</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use the Daily Diary to edit your mood and sleep trial checkins for specific dates. You can also see what your sleep stats was for those specific dates."
        />
      </Helmet>
      <Box mt={4}>
        <Typography variant="h3">Your Daily Diary</Typography>
      </Box>

      <Box mt={4}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <ArrowBackIosIcon onClick={handleBackClick} color="action" className={styles.navArrow} />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                InputAdornmentProps={{ position: 'start' }}
                label="Select a date to view"
                format="MM-DD-YYYY"
                disableFuture
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <ArrowForwardIosIcon onClick={handleForwardClick} color="action" className={styles.navArrow} />
          </Grid>
        </Grid>
      </Box>
      <Section>
        <DailyDiaryDetailsPanel selectedDate={selectedDate} />
      </Section>
    </Container>
  );
};

export default CheckInsView;

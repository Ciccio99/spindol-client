import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
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
import Section from 'components/common/Section';
import DailyDiaryDetailsPanel from 'components/dailyDiaryDetailsPanel/DailyDiaryDetailsPanel';
import { Event } from 'utils/Tracking';
import styles from './CheckInsView.module.css';

const CheckInsView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    Event('Daily Diary View', 'Date Selected');
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  const handleBackClick = () => {
    Event('Daily Diary View', 'Date Selected');
    setSelectedDate((prevDate) => moment(prevDate).subtract(1, 'day'));
  };

  const handleForwardClick = () => {
    Event('Daily Diary View', 'Date Selected');
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
        <title>Spindol - Daily Diary</title>
      </Helmet>
      <Box mt={4} mb={4}>
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
      <Divider />
      <Section>
        <DailyDiaryDetailsPanel selectedDate={selectedDate} />
      </Section>
    </Container>
  );
};

export default CheckInsView;

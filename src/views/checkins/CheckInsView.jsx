import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import DailyDiaryDetailsPanel from '../../components/dailyDiaryDetailsPanel/DailyDiaryDetailsPanel';
import Section from 'components/organizers/Section';

const CheckInsView = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const handleDateChange = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h3">Your Daily Diary</Typography>
      </Box>

      <Box mt={4}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            margin="normal"
            InputAdornmentProps={{ position: 'start' }}
            label="Select a date to view"
            format="MM-DD-YYYY"
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Section>
        <DailyDiaryDetailsPanel selectedDate={selectedDate} />
      </Section>
    </Container>
  );
};

export default CheckInsView;

import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import HabitServices from 'services/HabitServices';

const HabitPanel = ({ habit }) => {
  const [selectedTime, setSelectedTime] = useState(habit ? moment().startOf('day').add(habit.targetValue, 'minutes') : moment());

  const handleTimeSelect = useCallback((dateTime) => {
    const time = moment(dateTime);
    setSelectedTime(time);
  });

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center" spacing={2}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">
            {habit.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {`Set your goal ${habit.name}`}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Box textAlign="right">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardTimePicker
                variant="inline"
                mask="__:__ _M"
                value={selectedTime}
                onChange={handleTimeSelect}
                size="small"
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitPanel;

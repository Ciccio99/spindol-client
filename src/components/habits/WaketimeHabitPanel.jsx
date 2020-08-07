import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import HabitServices from 'services/HabitServices';
import { useAlertSystemDispatch } from 'context/alertSystemContext';

const NAME = 'Waketime';

const WaketimeHabitPanel = ({ habit }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [currentHabit, setCurrentHabit] = useState(habit);
  const [selectedTime, setSelectedTime] = useState(habit ? moment().startOf('day').add(habit.targetValue, 'minutes') : moment());
  const [saveDisabled, setSaveDisabled] = useState(true);
  const upsertHabit = useCallback(async (targetValue) => {
    const { data, error } = await HabitServices
      .upsertWaketimeHabit(targetValue);
    if (data) {
      setCurrentHabit(data);
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Waketime goal updated!',
      });
      setSaveDisabled(true);
      return;
    }
    if (error) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: error.message,
      });
    }
    if (currentHabit) {
      setSelectedTime(moment().startOf('day').add(currentHabit.targetValue, 'minutes'));
    } else {
      setSelectedTime(moment());
    }
  }, [currentHabit, dispatchAlertSystem]);

  const handleOnSave = useCallback(async () => {
    const time = selectedTime;
    const targetVal = time.diff(moment().startOf('day'), 'minutes');
    upsertHabit(targetVal);
  }, [selectedTime, upsertHabit]);

  const handleTimeOnChange = useCallback((dateTime) => {
    const time = moment(dateTime);
    setSelectedTime(time);
    if (saveDisabled) {
      setSaveDisabled(false);
    }
  }, [saveDisabled]);

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        <Grid item xs={12} sm="auto">
          <Typography variant="subtitle1">
            {NAME}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {`Set your ${NAME} goal `}
          </Typography>
        </Grid>
        <Grid item container justify="flex-end" spacing={2} xs={12} sm={7} wrap="nowrap">
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardTimePicker
                autoOk
                variant="inline"
                InputAdornmentProps={{ position: 'start' }}
                mask="__:__ _M"
                value={selectedTime}
                onChange={handleTimeOnChange}
                size="small"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <Button disabled={saveDisabled} onClick={handleOnSave} size="small" variant="contained" color="secondary" disableElevation>Save</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaketimeHabitPanel;

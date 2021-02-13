import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { ReactComponent as LeftCalBtn } from 'assets/left-cal-btn.svg';
import { ReactComponent as RightCalBtn } from 'assets/right-cal-btn.svg';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  navArrow: {
    cursor: 'pointer',
    textAlign: 'center',
    borderRadius: '50%',
    '&:hover': {
      boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.05)',
    },
  },
  inputDateText: {
    color: 'red',
    '& div': {
      '& input': {
        color: COLORS.RED,
        textAlign: 'center',
      },
    },
  },
}));

export default function DateSelector({ initDate = undefined, onSetDate }) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(initDate || moment());

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

  useEffect(() => {
    if (onSetDate) {
      onSetDate(selectedDate);
    }
  }, [selectedDate, onSetDate]);

  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justify="center"
      wrap="nowrap"
    >
      <Grid item>
        <LeftCalBtn
          onClick={handleBackClick}
          color="action"
          className={classes.navArrow}
        />
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            autoOk
            variant="inline"
            format="MMMM DD, YYYY"
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
            className={classes.inputDateText}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <RightCalBtn
          onClick={handleForwardClick}
          color="action"
          className={classes.navArrow}
        />
      </Grid>
    </Grid>
  );
}

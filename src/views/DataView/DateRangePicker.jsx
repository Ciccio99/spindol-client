import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import moment from 'moment-timezone';
import dateViews from 'constants/dateViews';
import useMedium from 'hooks/useMedium';

const useStylesArrows = makeStyles((theme) => ({
  root: {
    fill: theme.palette.text.secondary,
    cursor: 'pointer',
  },
}));

const DateRangePicker = ({ handleDatesUpdate, handleRangeUpdate }) => {
  const classesArrows = useStylesArrows();
  const { isMedium } = useMedium();
  const labelPlacement = 'end';
  const [viewRange, setViewRange] = useState(dateViews.M);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.M),
    endDate: moment().endOf(dateViews.M),
    month: moment().format('MMMM'),
    year: moment().format('YYYY'),
  });

  useEffect(() => {
    handleDatesUpdate(viewDates);
  }, [viewDates, handleDatesUpdate]);

  useEffect(() => {
    handleRangeUpdate(viewRange);
  }, [viewRange, handleRangeUpdate]);

  const handleArrowClick = (step) => {
    setViewDates((prevState) => {
      const startDate = moment(prevState.startDate).add(step, viewRange).startOf(viewRange);
      const endDate = moment(startDate).endOf(viewRange);
      return {
        startDate,
        endDate,
        month: startDate.format('MMMM'),
        year: startDate.format('YYYY'),
      };
    });
  };

  const handleRangeChange = (event) => {
    const newDateView = event.target.value;
    setViewRange(newDateView);
    setViewDates(() => {
      const startDate = moment().startOf(newDateView);
      const endDate = moment().endOf(newDateView);
      return {
        startDate,
        endDate,
        month: startDate.format('MMMM'),
        year: startDate.format('YYYY'),
      };
    });
  };

  return (
    <Box width={isMedium ? '100%' : 'auto'}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={65}>
        <ArrowBackIosOutlinedIcon onClick={() => { handleArrowClick(-1); }} classes={classesArrows} />
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mx={1} minWidth={240}>
          <DateLabel viewDates={viewDates} viewRange={viewRange} />
        </Box>
        <ArrowForwardIosOutlinedIcon onClick={() => { handleArrowClick(1); }} classes={classesArrows} />
      </Box>
      <Box display="flex" justifyContent="center">
        <FormControl component="fieldset">
          <RadioGroup row value={viewRange} onChange={handleRangeChange}>
            <FormControlLabel value={dateViews.W} control={<Radio />} label="Week" labelPlacement={labelPlacement} />
            <FormControlLabel value={dateViews.M} control={<Radio />} label="Month" labelPlacement={labelPlacement} />
            <FormControlLabel value={dateViews.Y} control={<Radio />} label="Year" labelPlacement={labelPlacement} />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};


const DateLabel = ({ viewDates, viewRange }) => {
  switch (viewRange) {
    case dateViews.W:
      return (
        <>
          <Typography variant="subtitle1">{`${viewDates.startDate.format('MMM DD')} - ${viewDates.endDate.format('MMM DD')}`}</Typography>
          <Typography variant="caption">{viewDates.year}</Typography>
        </>
      );
    case dateViews.Y:
      return (
        <>
          <Typography variant="subtitle1">{viewDates.year}</Typography>
          <Typography variant="caption" color="textSecondary">{`${viewDates.startDate.format('MMM')} - ${viewDates.endDate.format('MMM')}`}</Typography>
        </>
      );
    default:
      return (
        <>
          <Typography variant="subtitle1">{`${viewDates.month} ${viewDates.year}`}</Typography>
          <Typography variant="caption" color="textSecondary">{`${viewDates.startDate.format('ddd DD')} - ${viewDates.endDate.format('ddd DD')}`}</Typography>
        </>
      );
  }
};

export default DateRangePicker;

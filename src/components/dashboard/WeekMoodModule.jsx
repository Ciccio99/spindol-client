import React from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import { getMoodIcon } from 'constants/mood';
import COLORS from 'constants/colors';
const data = [
  { mood: 'awful', date: '2020-10-14' },
  { mood: 'good', date: '2020-10-15' },
  { mood: 'meh', date: '2020-10-16' },
  { mood: 'bad', date: '2020-10-17' },
  { mood: 'excellent', date: '2020-10-18' },
  { mood: 'good', date: '2020-10-19' },
  { mood: '', date: '2020-10-20' },
];

const WeekMoodModule = () => {
  return (
    <Box width="fit-content">
      <Box mb={2}>
        <Typography variant="subtitle1">Your mood over the <span style={{ color: COLORS.RED}}>last 6 days</span></Typography>
      </Box>
      <Paper elevation={24}>
        <Box display="flex">
          {
            data.map(({ mood, date }, index) => (
              <MoodCard key={index} mood={mood} date={date} border={index !== data.length - 1} />
            ))
          }
        </Box>
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  cardBorder: {
    borderRight: `1px solid ${COLORS.BORDER_GRAY}`,
  },
  dayText: {
    textTransform: 'uppercase',
  },
}));

const MoodCard = ({ mood, date, border }) => {
  const classes = useStyles();
  const MoodIcon = getMoodIcon(mood);
  return (
    <Box px={3} pt={2} pb={1} display="flex" flexDirection="column" className={clsx({ [classes.cardBorder]: (border) })}>
      <Box display="flex" justifyContent="center" mb={2}>
        <MoodIcon />
      </Box>
      <Typography className={clsx(classes.dayText)} align="center" variant="subtitle2">
        {moment.utc(date).format('ddd')}
      </Typography>
    </Box>
  );
};

export default WeekMoodModule;

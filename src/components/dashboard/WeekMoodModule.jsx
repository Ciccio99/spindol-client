import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import { getMoodIcon } from 'constants/mood';
import COLORS from 'constants/colors';
import useDashboardDiaries from 'hooks/useDashboardDiaries';
import useViewport from 'hooks/useViewport';

const Container = ({ children }) => (
  <Box>
    <Box mb={2}>
      <Typography variant="subtitle1">
        Your mood over the{' '}
        <span style={{ color: COLORS.RED }}>last 7 days</span>
      </Typography>
    </Box>
    <Box display="flex" flexWrap="wrap">
      {children}
    </Box>
  </Box>
);

const WeekMoodModule = () => {
  const { isLoading, isError, data, error } = useDashboardDiaries();

  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  if (isError) {
    return <Container>{error.message}</Container>;
  }

  if (data) {
    return (
      <Container>
        {data.map((elem, index) => (
          <MoodCard key={index} mood={elem.diary?.mood} date={elem.date} />
        ))}
      </Container>
    );
  }

  return null;
};

const useStyles = makeStyles(() => ({
  cardToday: {
    backgroundColor: COLORS.PEACH,
    border: `1px solid ${COLORS.PEACH}`,
  },
  dayText: {
    textTransform: 'uppercase',
  },
  textToday: {
    color: COLORS.RED,
  },
  cardGrow: {
    flexGrow: 1,
  },
}));

const MoodCard = ({ mood, date }) => {
  const classes = useStyles();
  const { width } = useViewport();
  const MoodIcon = getMoodIcon(mood);
  const sameDay = moment(date).isSame(moment(), 'day');

  return (
    <Paper
      elevation={24}
      className={clsx({
        [classes.cardGrow]: width >= 1100,
        [classes.cardToday]: sameDay,
      })}
    >
      <Box
        px={3}
        pt={2}
        pb={1}
        maxHeight={100}
        height={100}
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" mb={1}>
          <MoodIcon size={48} />
        </Box>
        <Typography
          className={clsx(classes.dayText, { [classes.textToday]: sameDay })}
          align="center"
          variant="h4"
        >
          {moment.utc(date).format('ddd')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WeekMoodModule;

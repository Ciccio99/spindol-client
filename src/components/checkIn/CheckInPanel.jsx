import React, { useState } from 'react';
import {
  Box, Grid, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useTodayDiary from 'hooks/useTodayDiary';
import { useMutation } from 'react-query';
import COLORS from 'constants/colors';
import { MOODS, getMoodSvg } from 'constants/mood';

const useStyles = makeStyles(() => ({
  moodCard: {
    width: 320,
    cursor: 'pointer',
    transition: 'all 0.25s ease-in-out',
  },
  moodCardSelected: {
    background: COLORS.RED,
  },
  moodText: {
    color: COLORS.DARK_BLUE,
    textTransform: 'capitalize',
  },
  moodTextSelect: {
    color: COLORS.WHITE,
  },
  moodImg: {
    maxWidth: '28vw',
  },
}));

const CHECK_IN_STATE = {
  MOOD: 0,
  ACTIVITIES: 1,
};

const CheckInPanel = () => {
  const classes = useStyles();
  const [checkInState, setCheckInState] = useState(CHECK_IN_STATE.MOOD);
  const { data, isLoading } = useTodayDiary();
  const [saveDailyDiary] = useMutation((newData) => {});
  // console.log(data);

  return (
    <MoodPanel />
  );
};

const MoodPanel = () => {
  const classes = useStyles();
  const [moodState, setMoodState] = useState(MOODS.EXCELLENT);

  const onSelectHandle = (mood) => setMoodState(mood);

  return (
    <Box width="100%" height="100vh" mt="-48px" px={2} pb={3} pt={10} display="flex">
      <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-end">
        <Grid container direction="column" spacing={2}>
          {
            Object.keys(MOODS).map((moodKey) => (
              <Grid item key={moodKey}>
                <MoodCard
                  mood={MOODS[moodKey]}
                  selected={MOODS[moodKey] === moodState}
                  onSelect={() => onSelectHandle(MOODS[moodKey])}
                />
              </Grid>
            ))
          }
        </Grid>
      </Box>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" p={2}>
        <img src={getMoodSvg(moodState)} alt={moodState} className={classes.moodImg} width="100%" height="100%" />
      </Box>
    </Box>

  );
};

const MoodCard = ({ mood, selected, onSelect }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={24}
      onClick={onSelect}
      className={clsx(classes.moodCard, { [classes.moodCardSelected]: selected })}
    >
      <Box px={3} p={4}>
        <Typography className={clsx(classes.moodText, { [classes.moodTextSelect]: selected })} variant="subtitle1">{mood}</Typography>
      </Box>
    </Paper>
  );
};


export default CheckInPanel;

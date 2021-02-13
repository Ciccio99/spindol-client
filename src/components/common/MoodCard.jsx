import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import React from 'react';

const useStyles = makeStyles(() => ({
  moodCard: {
    maxWidth: 320,
    minWidth: '100%',
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
}));

export default function MoodCard({ mood, selected, onClick, isSmall = false }) {
  const classes = useStyles();

  return (
    <Paper
      elevation={24}
      onClick={onClick}
      className={clsx(classes.moodCard, {
        [classes.moodCardSelected]: selected,
      })}
    >
      {isSmall ? (
        <Box p={2} width="100%">
          <Typography
            className={clsx(classes.moodText, {
              [classes.moodTextSelect]: selected,
            })}
            variant="subtitle1"
          >
            {mood}
          </Typography>
        </Box>
      ) : (
        <Box px={3} p={4} width="100%">
          <Typography
            className={clsx(classes.moodText, {
              [classes.moodTextSelect]: selected,
            })}
            variant="subtitle1"
          >
            {mood}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddButtonIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  activityCard: {
    cursor: 'pointer',
    '&:hover': {
      background: COLORS.GRAY_BACKGROUND,
    },
  },
  cardText: {
    color: COLORS.DARK_BLUE,
  },
  activityIconContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: '50%',
  },
  activityIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
}));

export default function CreateActivityCard({ activityName, onClick }) {
  const classes = useStyles();

  return (
    <Box
      px={2}
      py={1}
      minHeight={56}
      width="100%"
      display="flex"
      alignItems="center"
      onClick={onClick}
      className={classes.activityCard}
    >
      <Box className={classes.activityIconContainer}>
        <AddButtonIcon size={32} />
      </Box>
      <Box ml={2}>
        <Typography className={classes.cardText} variant="subtitle1">
          Create new activity
        </Typography>
        <Typography variant="body1">"{activityName}"</Typography>
      </Box>
    </Box>
  );
}

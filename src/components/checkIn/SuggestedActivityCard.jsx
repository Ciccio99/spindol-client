import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';
import { Box, Typography } from '@material-ui/core';
import { AddButtonIcon } from 'components/common/Icons';

const useStyles = makeStyles(() => ({
  activityIconContainer: {
    position: 'relative',
    width: 32,
    height: 32,
    minWidth: 32,
  },
  activityIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
  },
  checkMark: {
    zIndex: 1,
  },
  accentText: {
    color: COLORS.RED,
  },
  readMore: {
    color: COLORS.DARK_BLUE,
  },
  descriptionContainer: {
    overflow: 'hidden',
    position: 'relative',
    height: 46,
  },
  descriptionText: {
    color: COLORS.GRAY,
    width: '95%',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

export default function SuggestedActivityCard({ activity, onClick, onAdd }) {
  const classes = useStyles();

  return (
    <Box px={2} py={1} minHeight={56} width="100%" display="flex">
      <Box className={classes.activityIconContainer}>
        <AddButtonIcon
          size={32}
          onClick={onAdd}
          className={classes.clickable}
        />
      </Box>
      <Box
        pl={2}
        display="flex"
        flexDirection="column"
        onClick={onClick}
        className={classes.clickable}
      >
        <Typography variant="subtitle1">{activity.name}</Typography>
        <div className={classes.descriptionContainer}>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="textSecondary"
          >
            {activity.description}
          </Typography>
        </div>
        <Typography variant="body1" align="right" className={classes.readMore}>
          read more
        </Typography>
      </Box>
    </Box>
  );
}

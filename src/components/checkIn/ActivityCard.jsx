import React from 'react';
import clsx from 'clsx';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';
import { Typography } from '@material-ui/core';
import emptyCircleSvg from 'assets/emoticons/empty-face.svg';
import checkMarkSvg from 'assets/check-mark.svg';

const useStyles = makeStyles((theme) => ({
  activityCard: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    minHeight: 56,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      background: COLORS.GRAY_BACKGROUND,
    },
  },
  cardTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardText: {
    marginLeft: theme.spacing(2),
  },
  activityIconContainer: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  activityIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
  checkMark: {
    zIndex: 1,
  },
  selectedActivity: {
    background: COLORS.LIGHTEST_GRAY,
  },
  accentText: {
    color: COLORS.RED,
  },
}));
export default function ActivityCard({
  activity,
  onClick,
  isSelected = false,
}) {
  const classes = useStyles();
  const isNew =
    moment.utc(activity.createdAt).diff(moment.utc(), 'hours') > -12;

  return (
    <div
      onClick={onClick}
      className={clsx(classes.activityCard, {
        [classes.selectedActivity]: isSelected,
      })}
    >
      <div className={classes.activityIconContainer}>
        {isSelected ? (
          <>
            <img
              src={emptyCircleSvg}
              className={classes.activityIcon}
              width={40}
              height={40}
              alt="Activity Completed"
            />
            <img
              src={checkMarkSvg}
              className={clsx(classes.activityIcon, classes.checkMark)}
              width={40}
              height={40}
              alt="Activity Completed"
            />
          </>
        ) : (
          <img
            className={classes.activityIcon}
            src={emptyCircleSvg}
            width={40}
            height={40}
            alt="Activity Not Completed"
          />
        )}
      </div>
      <div className={classes.cardTextContainer}>
        <Typography className={classes.cardText} variant="subtitle1">
          {activity.tag}
        </Typography>
        {isNew ? (
          <Typography className={classes.accentText} variant="subtitle2">
            New
          </Typography>
        ) : null}
      </div>
    </div>
  );
}

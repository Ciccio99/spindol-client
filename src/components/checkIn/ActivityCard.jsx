/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import clsx from 'clsx';
import moment from 'moment-timezone';
import tinyColor from 'tinycolor2';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';
import { Typography } from '@material-ui/core';
import checkMarkSvg from 'assets/check-mark.svg';
import checkMarkDarkSvg from 'assets/check-mark-dark.svg';
import { getShape } from 'utils/shape-utils';

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
    maxWidth: 40,
    height: 40,
    maxHeight: 40,
    position: 'absolute',
  },
  checkMark: {
    zIndex: 1,
    width: 24,
    maxWidth: 24,
    height: 24,
    maxHeight: 24,
    position: 'absolute',
    left: 8,
    top: 8,
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
  const Shape = getShape(activity.shapeId);
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
            <div className={classes.activityIcon}>
              <Shape fill={activity.shapeColor} width={40} height={40} />
            </div>
            {tinyColor(activity.shapeColor).getBrightness() > 180 ? (
              <img
                src={checkMarkDarkSvg}
                className={classes.checkMark}
                width={24}
                height={24}
                alt="Activity Completed"
              />
            ) : (
              <img
                src={checkMarkSvg}
                className={classes.checkMark}
                width={24}
                height={24}
                alt="Activity Completed"
              />
            )}
          </>
        ) : (
          <div className={classes.activityIcon}>
            <Shape fill={activity.shapeColor} width={40} height={40} />
          </div>
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

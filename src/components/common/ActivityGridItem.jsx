import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import tinyColor from 'tinycolor2';
import COLORS from 'constants/colors';
import { getShape } from 'utils/shape-utils';
import { ReactComponent as CheckMark } from 'assets/check-mark.svg';
import { ReactComponent as CheckMarkDark } from 'assets/check-mark-dark.svg';

const useStyles = makeStyles((theme) => ({
  activityName: {
    marginTop: theme.spacing(1),
  },
  activityCard: {
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      background: COLORS.GRAY_BACKGROUND,
    },
  },
  iconContainer: {
    position: 'relative',
  },
  selectedActivity: {
    background: COLORS.LIGHTEST_GRAY,
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
  paper: {
    height: '100%',
  },
}));
export default function ActivityGridItem({ activity, isSelected, onClick }) {
  const classes = useStyles();
  const Shape = getShape(activity.shapeId);

  return (
    <Paper elevation={24} className={classes.paper}>
      <Box
        p={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={onClick}
        className={clsx(classes.activityCard, {
          [classes.selectedActivity]: isSelected,
        })}
        height="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.iconContainer}>
            <Shape fill={activity.shapeColor} width={40} height={40} />
            {isSelected ? (
              <>
                {tinyColor(activity.shapeColor).getBrightness() > 180 ? (
                  <CheckMarkDark
                    width={24}
                    height={24}
                    className={classes.checkMark}
                  />
                ) : (
                  <CheckMark
                    width={24}
                    height={24}
                    className={classes.checkMark}
                  />
                )}
              </>
            ) : null}
          </div>
          <Typography
            variant="body1"
            align="center"
            className={classes.activityName}
          >
            {activity.tag}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

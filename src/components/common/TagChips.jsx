import React, { useState } from 'react';
import { Chip, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SleepGoalDetailsModal from 'components/common/modals/SleepGoalDetailsModal';
import COLORS from 'constants/colors';

const useChipStyles = makeStyles((theme) => ({
  activeSleepChipRoot: {
    background: COLORS.NIGHTTIME_GRADIENT,
    '&:hover': {
      background: COLORS.LIGHT_NIGHTTIME_GRADIENT,
    },
    '&:active': {
      background: COLORS.NIGHTTIME_GRADIENT,
    },
    '&:focus': {
      background: COLORS.NIGHTTIME_GRADIENT,
    },
  },
  sleepChipRoot: {

  },
  activeChipRoot: {

  },
  chipRoot: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const useSelectedChipStyles = makeStyles((theme) => ({
  rootChip: {
    animation: `$growSelectedChip 0.25s ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes growSelectedChip': {
    '50%': { transform: 'scale(1.15)' },
  },
}));

export const ActivityChip = ({ tag, isSelected, handleOnClick }) => {
  const classes = useSelectedChipStyles();
  if (isSelected) {
    return (
      <Chip
        label={tag.tag}
        color="primary"
        variant="default"
        onClick={handleOnClick}
        clickable
        disableRipple
        className={classes.rootChip}
      />
    );
  }

  return (
    <Chip
      label={tag.tag}
      onClick={handleOnClick}
      disableRipple
      clickable
    />
  );
};


const useDisplayChip = makeStyles((theme) => ({
  rootChip: {
    animation: `$growChip 0.6s ${theme.transitions.easing.sharp}`,
  },
  '@keyframes growChip': {
    '0%': { transform: 'scale(0)' },
    '60%': { transform: 'scale(1.15)' },
    '100%': { transform: 'scale(1)' },
  },
}));

export const DisplayActivityChip = ({ tag }) => {
  const classes = useDisplayChip();
  return (
    <Chip
      className={classes.rootChip}
      label={tag.tag}
      color="primary"
      variant="default"
    />
  );
};

export const SleepChip = ({ tag, isSelected, handleOnClick }) => {
  const classes = useChipStyles();
  const animClasses = useSelectedChipStyles();

  if (isSelected) {
    return (
      <Chip
        classes={{ root: classes.activeSleepChipRoot }}
        className={animClasses.rootChip}
        label={tag.tag}
        color="primary"
        variant="default"
        onClick={handleOnClick}
        clickable
        disableRipple
      />
    );
  }
  return (
    <Chip
      label={tag.tag}
      onClick={handleOnClick}
      disableRipple
      clickable
    />
  );
};

const useDisplaySleepChipStyles = makeStyles(() => ({
  root: {
    color: COLORS.WHITE,
    background: COLORS.NIGHTTIME_GRADIENT,
    '&:hover': {
      background: COLORS.LIGHT_NIGHTTIME_GRADIENT,
    },
    '&:active': {
      background: COLORS.NIGHTTIME_GRADIENT,
    },
    '&:focus': {
      background: COLORS.NIGHTTIME_GRADIENT,
    },
    cursor: 'pointer',
  },
}));

export const DisplaySleepChip = ({ tag }) => {
  const classes = useDisplaySleepChipStyles();
  const animClasses = useDisplayChip();
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const handleOnClick = () => {
    setIsOpenInfoModal(true);
  };

  return (
    <>
      <Tooltip title="View Details">
        <Chip
          classes={classes}
          className={animClasses.rootChip}
          label={tag.tag}
          variant="default"
          clickable
          onClick={handleOnClick}
          disableRipple
        />
      </Tooltip>
      {
        tag.sleepTrial
        && <SleepGoalDetailsModal sleepTrial={tag.sleepTrial} open={isOpenInfoModal} handleModalClose={() => { setIsOpenInfoModal(false); }} />
      }

    </>
  );
};

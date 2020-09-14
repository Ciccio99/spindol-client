import React, { useState } from 'react';
import { Chip, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SleepGoalDetailsModal from 'components/modals/SleepGoalDetailsModal';
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

export const ActivityChip = ({ tag, isSelected, handleOnClick }) => {
  if (isSelected) {
    return (
      <Chip
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

export const DisplayActivityChip = ({ tag }) => (
  <Chip
    label={tag.tag}
    color="primary"
    variant="default"
  />
);

export const SleepChip = ({ tag, isSelected, handleOnClick }) => {
  const classes = useChipStyles();
  if (isSelected) {
    return (
      <Chip
        classes={{ root: classes.activeSleepChipRoot }}
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
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const handleOnClick = () => {
    setIsOpenInfoModal(true);
  };

  return (
    <>
      <Tooltip title="View Details">
        <Chip
          classes={classes}
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

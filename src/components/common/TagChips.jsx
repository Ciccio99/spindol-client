import React, { useState } from 'react';
import { Chip, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SleepGoalDetailsModal from 'components/modals/SleepGoalDetailsModal';
import COLORS from 'constants/colors';

const useChipStyles = makeStyles((theme) => ({
  activeSleepChipRoot: {
    background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%);',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(148,121,188,0.85) 0%, rgba(230,126,86,0.85) 50%, rgba(250,201,89,0.85) 100%);',
    },
    '&:focus': {
      background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%);',
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
    background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%);',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(148,121,188,0.85) 0%, rgba(230,126,86,0.85) 50%, rgba(250,201,89,0.85) 100%);',
    },
    '&:active': {
      background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%);',
    },
    '&:focus': {
      background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%);',
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

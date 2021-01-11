import React from 'react';
import {
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import nextArrowIcon from 'assets/icons/ic_next-arrow.svg';

const useStyles = makeStyles(() => ({
  StepperButton: {
    background: COLORS.WHITE,
    borderRadius: 40,
    border: `1px solid ${COLORS.BORDER_GRAY}`,
    cursor: 'pointer',
    position: 'absolute',
    bottom: 32,
    right: 24,
    boxSizing: 'border-box',
    transition: 'box-shadow 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.05)',
    },
  },
  previous: {
    position: 'absolute',
    bottom: 32,
    right: 175,
  },
  backArrowIcon: {
    transform: 'rotate(180deg)',
  },
}));

const StepperButton = ({ back, onClick }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.StepperButton, { [classes.previous]: back })} onClick={onClick} py={2} px={5} display="flex" justifyContent="center" alignItems="center">
      <img src={nextArrowIcon} alt="next arrow" className={clsx({ [classes.backArrowIcon]: back })} />
    </Box>
  );
};

export default StepperButton;

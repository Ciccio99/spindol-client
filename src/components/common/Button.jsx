import React from 'react';
import { Typography, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    background: COLORS.DARK_BLUE,
    color: COLORS.WHITE,
    textTransform: 'none',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.1))',
    },
  },
  rootRound: {
    background: COLORS.DARK_BLUE,
    color: COLORS.WHITE,
    padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`,
    borderRadius: 40,
    border: `1px solid ${COLORS.BORDER_GRAY}`,
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'box-shadow 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.05)',
    },
  },
  buttonText: {
    color: 'inherit',
  },
  fullWidth: {
    width: '100%',
  },
}));

const Button = ({ text, className, fullWidth, isRound = false, ...other }) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={clsx(className, {
        [classes.root]: !isRound,
        [classes.rootRound]: isRound,
        [classes.fullWidth]: fullWidth,
      })}
      disableRipple
      {...other}
    >
      <Typography className={classes.buttonText} variant="button">
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default Button;

import React from 'react';
import {
  Typography,
  ButtonBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    boxSizing: 'border-box',
    boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.05)',
    borderRadius: '40px',
    color: COLORS.DARK_BLUE,
    textTransform: 'none',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      backgroundColor: COLORS.DARK_BLUE,
      color: COLORS.WHITE,
    },
  },
  buttonText: {
    color: 'inherit',
  },
  fullWidth: {
    width: '100%',
  },
}));

const Button = ({ text, className, fullWidth, ...other }) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={clsx(classes.root, className, { [classes.fullWidth]: fullWidth })}
      disableRipple
      {...other}
    >
      <Typography className={classes.buttonText} variant="button">{text}</Typography>
    </ButtonBase>
  );
};

export default Button;

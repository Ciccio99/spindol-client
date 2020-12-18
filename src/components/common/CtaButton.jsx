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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
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
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'inherit',
  },
}));

const CtaButton = ({ text, className, ...other }) => {
  const classes = useStyles();
  return (
    <ButtonBase className={clsx(classes.root, className)} {...other} disableRipple>
      <Typography className={classes.buttonText} variant="button">{text}</Typography>
    </ButtonBase>
  );
};

export default CtaButton;

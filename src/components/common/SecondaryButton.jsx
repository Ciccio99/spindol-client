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
    background: COLORS.WHITE,
    color: COLORS.DARK_BLUE,
    border: `1px solid ${COLORS.LIGHT_GRAY}`,
    textTransform: 'none',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.1))',
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

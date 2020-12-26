import React from 'react';
import {
  Typography,
  ButtonBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    background: COLORS.DARK_BLUE,
    color: COLORS.WHITE,
    textTransform: 'none',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.1))',
    },
  },
  rootMobile: {
    padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
  },
  buttonText: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'inherit',
  },
}));

const CtaButton = ({ text, className, ...other }) => {
  const classes = useStyles();
  const { isMobile } = useMobile();

  return (
    <ButtonBase className={clsx(classes.root, className, { [classes.rootMobile]: isMobile })} {...other} disableRipple>
      <Typography className={classes.buttonText} variant="button">{text}</Typography>
    </ButtonBase>
  );
};

export default CtaButton;

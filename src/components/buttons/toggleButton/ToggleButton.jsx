import React from 'react';
import {
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useSelectedButtonStyles = makeStyles((theme) => ({
  buttonAnimation: {
    animation: `$growButton 0.35s ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes growButton': {
    '50%': { transform: 'scale(1.15)' },
  },
  root: {
    borderRadius: '20px',
  },
  textRoot: {
    fontWeight: 600,
  },
  buttonActive: {
    backgroundColor: '#e67e56',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#e67e56',
    },
  },
}));

// https://github.com/mui-org/material-ui/issues/13394
const ToggleButton = (props) => {
  const classes = useSelectedButtonStyles();
  const {
    value, onInteractionHandler, activebutton, children, ...otherProps
  } = props;

  return (
    <Grid item {...otherProps}>
      <Button
        className={clsx(classes.root, {
          [classes.buttonAnimation]: activebutton,
          [classes.buttonActive]: activebutton,
        })}
        variant="outlined"
        size="medium"
        fullWidth
        disableRipple
        onClick={() => onInteractionHandler(value)}
      >
        <Typography className={classes.textRoot} variant="caption">{children}</Typography>
      </Button>
    </Grid>
  );
};

export default ToggleButton;

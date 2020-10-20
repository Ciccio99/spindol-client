import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';

const styles = {
  root: {
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    boxSizing: 'border-box',
    boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.05)',
    borderRadius: '40px',
    color: COLORS.BLUE,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};

const HypnosButton = ({
  classes, children, className, ...other
}) => (
  <Button className={clsx(classes.root, className)} {...other}>
    {children}
  </Button>
);

export default withStyles(styles)(HypnosButton);

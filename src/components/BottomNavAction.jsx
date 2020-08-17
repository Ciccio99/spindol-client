import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigationAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.tertiary.light,
    '& :hover': {
      color: theme.palette.tertiary.dark,
      '& svg': {
        color: theme.palette.tertiary.dark,
      },
    },
  },
  selected: {
    fontSize: '0.75rem !important',
    color: theme.palette.common.white,
    '& svg': {
      color: theme.palette.common.white,
    },
    '& :hover': {
      color: `${theme.palette.common.white} !important`,
      '& svg': {
        color: theme.palette.common.white,
      },
    },
  },
  label: {
    fontSize: '0.75rem',
  },
}));

const BottomNavAction = (props) => (
  <BottomNavigationAction {...props} classes={useStyles()} />
);

export default BottomNavAction;

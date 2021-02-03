import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  sidePanelPaper: {
    borderTop: 'revert',
    borderBottom: 'revert',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 375,
    width: '100%',
    height: '100%',
    boxShadow: '6px 0px 0px 0px rgba(0,0,0,0.05)',
  },
}));

export default function SidePanel({ children, className }) {
  const classes = useStyles();

  return (
    <Paper elevation={24} className={clsx(classes.sidePanelPaper, className)}>
      {children}
    </Paper>
  );
}

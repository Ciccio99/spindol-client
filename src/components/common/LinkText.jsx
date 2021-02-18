import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  a: {
    textDecoration: 'none',
  },
  navLink: {
    color: COLORS.DARK_BLUE,
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
}));

const LinkText = ({ external, to, children }) => {
  const classes = useStyles();

  return external ? (
    <a
      href={to}
      className={classes.a}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Typography className={classes.navLink} variant="subtitle2">
        {children}
      </Typography>
    </a>
  ) : (
    <NavLink to={to}>
      <Typography className={classes.navLink} variant="subtitle2">
        {children}
      </Typography>
    </NavLink>
  );
};

export default LinkText;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navLink: {
    textDecoration: 'none',
    color: '#9072BA',
  },
}));

const LinkText = ({ external, to, children }) => {
  const classes = useStyles();

  return (
    external
      ? (
        <a href={to} className={classes.navLink} target="_blank" rel="noopener noreferrer">
          <Typography variant="subtitle2">
            {children}
          </Typography>
        </a>
      )
      : (
        <NavLink to={to} className={classes.navLink}>
          <Typography variant="subtitle2">
            {children}
          </Typography>
        </NavLink>
      )
  );
};

export default LinkText;

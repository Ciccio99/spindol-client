import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import styles from './LinkText.module.css';

const LinkText = ({ external, to, children }) => (
  external
    ? (
      <a href={to} className={styles.navLink} target="_blank" rel="noopener noreferrer">
        <Typography variant="subtitle2">
          {children}
        </Typography>
      </a>
    )
    : (
      <NavLink to={to} className={styles.navLink}>
        <Typography variant="subtitle2">
          {children}
        </Typography>
      </NavLink>
    )
);

export default LinkText;

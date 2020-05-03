import React from 'react'
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core'
import styles from './LinkText.module.css';

const LinkText = (props) => {
  return (
      props.external
      ? <a href={props.to} className={styles.navLink}>
          <Typography variant='subtitle2'>
            {props.children}
          </Typography>
        </a>
      : <NavLink to={props.to} className={styles.navLink}>
          <Typography variant='subtitle2'>
            {props.children}
          </Typography>
        </NavLink>
  );
}

export default LinkText;

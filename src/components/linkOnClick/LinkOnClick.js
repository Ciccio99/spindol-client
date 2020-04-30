import React from 'react'
import { Typography } from '@material-ui/core'
import styles from './LinkOnClick.module.css';

const LinkOnClick = (props) => {
  return (
      <Typography {...props} variant='subtitle2' className={styles.navLink}>
        {props.children}
      </Typography>
  );
}

export default LinkOnClick;

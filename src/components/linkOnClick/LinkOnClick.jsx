import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './LinkOnClick.module.css';

const LinkOnClick = (props) => {
  const { errorColor, children, ...rest } = props;
  return (
    <Typography {...rest} variant="subtitle2" className={`${styles.navLink} ${errorColor ? styles.warning : ''}`}>
      {children}
    </Typography>
  );
};

export default LinkOnClick;

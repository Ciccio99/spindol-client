import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography
} from '@material-ui/core';
import styles from './ToggleButton.module.css';

const ToggleButton = (props) => {
  const [classes, setClasses] = useState(`${styles.button} ${styles.buttonInactive}`);

  useEffect(() => {
    setClasses(`${styles.button} ${props.activebutton ? styles.buttonActive : styles.buttonInactive}`);
  }, [props.activebutton]);

  return (
    <Button className={classes} variant='outlined' size='large' disableElevation {...props}>
      <Typography className={styles.buttonText} variant='caption'>{props.children}</Typography>
    </Button>
  );
}

export default ToggleButton;

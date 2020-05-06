import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import styles from './ToggleButton.module.css';

const ToggleButton = (props) => {
  const [classes, setClasses] = useState(`${styles.button} ${styles.buttonInactive}`);

  useEffect(() => {
    setClasses(`${styles.button} ${props.activebutton ? styles.buttonActive : styles.buttonInactive}`);
  }, [props.activebutton]);

  return (
    <Grid item {...props}>
      <Button className={classes} variant='outlined' size='medium' fullWidth disableElevation onClick={props.onInteraction}>
        <Typography className={styles.buttonText} variant='caption'>{props.children}</Typography>
      </Button>
    </Grid>
  );
}

export default ToggleButton;

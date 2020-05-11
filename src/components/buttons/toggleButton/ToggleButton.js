import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import styles from './ToggleButton.module.css';

// https://github.com/mui-org/material-ui/issues/13394
const ToggleButton = (props) => {
  const { onInteractionHandler, ...otherProps } = props;
  const [classes, setClasses] = useState(`${styles.button} ${styles.buttonInactive}`);

  useEffect(() => {
    setClasses(`${styles.button} ${props.activebutton ? styles.buttonActive : styles.buttonInactive}`);
  }, [props.activebutton]);

  return (
    <Grid item {...otherProps}>
      <Button className={classes} variant='outlined' size='medium' fullWidth disableElevation onClick={props.onInteractionHandler}>
        <Typography className={styles.buttonText} variant='caption'>{props.children}</Typography>
      </Button>
    </Grid>
  );
}

export default ToggleButton;

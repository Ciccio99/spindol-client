import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import styles from './ToggleButton.module.css';

// https://github.com/mui-org/material-ui/issues/13394
const ToggleButton = (props) => {
  const {
    value, onInteractionHandler, activebutton, children, ...otherProps
  } = props;
  const [classes, setClasses] = useState(`${styles.button} ${styles.buttonInactive}`);

  useEffect(() => {
    setClasses(`${styles.button} ${activebutton ? styles.buttonActive : styles.buttonInactive}`);
  }, [activebutton]);

  return (
    <Grid item {...otherProps}>
      <Button className={classes} variant="outlined" size="medium" fullWidth disableElevation onClick={() => onInteractionHandler(value)}>
        <Typography className={styles.buttonText} variant="caption">{children}</Typography>
      </Button>
    </Grid>
  );
};

export default ToggleButton;

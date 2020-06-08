import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import styles from './CTA.module.css';

const ConnectDevice = () => (
  <Paper elevation={24} style={{ background: '#6D99B1' }}>
    <Box p={4}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TrackChangesIcon htmlColor="#ffffff" fontSize="large" />
        </Grid>
        <Grid item sm={8}>
          <Typography className={styles.connectDeviceText} variant="h6" display="block">Connect your sleep tracker</Typography>
          <Typography className={styles.connectDeviceText} variant="caption" display="block">
            You can connect your Oura Ring (and coming soon: FitBit, Withings)
            to help us monitor your sleep and
            how the different trial methods are affecting you.
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <Button color="secondary" variant="contained" size="large" disableElevation>Connect Sleep Tracker</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default ConnectDevice;

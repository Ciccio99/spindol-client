import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Grid, Typography, Button } from '@material-ui/core';
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
          <Typography
            className={styles.connectDeviceText}
            variant="h6"
            display="block"
          >
            Connect your sleep tracker
          </Typography>
          <Typography
            className={styles.connectDeviceText}
            variant="caption"
            display="block"
          >
            Connect your Oura Ring or Withings (coming soon: FitBit) to help
            Spindol monitor your sleep and determine how different sleep trials
            affect you.
          </Typography>
        </Grid>
        <Grid item>
          <Link
            to={{ pathname: '/settings', hash: 'devices' }}
            style={{ textDecoration: 'none' }}
          >
            <Button color="secondary" variant="contained" size="large">
              Connect Sleep Tracker
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default ConnectDevice;

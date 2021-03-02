import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Grid, Typography } from '@material-ui/core';
import Button from 'components/common/Button';
import { ReactComponent as ConnectSvg } from 'assets/illus_connect.svg';
import useMobile from 'hooks/useMobile';

const DesktopCTA = () => (
  <Paper elevation={24}>
    <Box p={4}>
      <Grid container justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Box display="flex">
            <ConnectSvg width="125" />
            <Box ml={4}>
              <Typography variant="h2" gutterBottom>
                Connect your sleep tracker
              </Typography>
              <Typography variant="body1">
                Please connect your sleep tracker to help to start monitoring
                your sleep.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Link
            to={{ pathname: '/settings', hash: 'devices' }}
            style={{ textDecoration: 'none' }}
          >
            <Button text="Connect Sleep Tracker" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

const MobileCTA = () => (
  <Paper elevation={24}>
    <Box p={4}>
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ConnectSvg height="50" />
            <Box my={4}>
              <Typography variant="h2" gutterBottom>
                Connect your sleep tracker
              </Typography>
              <Typography variant="body1">
                Please connect your sleep tracker to help to start monitoring
                your sleep.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Link
            to={{ pathname: '/settings', hash: 'devices' }}
            style={{ textDecoration: 'none' }}
          >
            <Button text="Connect Sleep Tracker" fullWidth />
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

const ConnectDevice = () => {
  const { isMobile } = useMobile();

  return isMobile ? <MobileCTA /> : <DesktopCTA />;
};

export default ConnectDevice;

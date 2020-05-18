import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Modal,
  Button,
  Tab,
  Tabs
} from '@material-ui/core';

import styles from './SleepTrialTracker.module.css';
import LinkOnClick from '../linkOnClick/LinkOnClick';
import SleepTrialsView from '../../views/sleepTrials/SleepTrialsView';
import CurrentSleepTrialsSubPanel from './CurrentSleepTrialsSubPanel';
import CompletedSleepTrialsSubPanel from './CompletedSleepTrialsSubPanel';
import TabPanel from '../tabPanel/TabPanel';

const CurrentSleepTrialTrackers = ({ trialTrackers }) => {
  const [showSleepTrials, setShowSleepTrials] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabSelect = (e, newValue) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  return (
    <Paper className={styles.paper} elevation={0} style={{minHeight: '100vh'}}>
      <Box pl={3} pt={4} pr={3} pb={1}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          spacing={3}
        >
          <Grid item xs={12} sm={8}>
            <Typography variant='h5'>
              Your sleep trials
            </Typography>
            <p className={styles.heroSubText}>This is where you can track your progress towards completing sleep trials.</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LinkOnClick onClick={() => {setShowSleepTrials(true)}}>
              <Button className={styles.button} fullWidth variant='outlined' disableElevation>Start A Sleep Trial</Button>
            </LinkOnClick>
          </Grid>
        </Grid>
      </Box>
      <Box pt={2}>
        <Tabs value={tabValue} onChange={handleTabSelect}>
          <Tab label='Current' disableRipple/>
          <Tab label='Completed' disableRipple/>
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={tabValue} index={0}>
          <CurrentSleepTrialsSubPanel trialTrackers={trialTrackers}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CompletedSleepTrialsSubPanel trialTrackers={trialTrackers}/>
        </TabPanel>
      </Box>

      <Modal
        className={styles.modal}
        open={showSleepTrials}
        onClose={() => {setShowSleepTrials(false)}}
        onBackdropClick={() => {setShowSleepTrials(false)}}
        keepMounted={true}
      >
        <Box display='flex' justifyContent='center'>
          <SleepTrialsView handleCloseClick={() => {setShowSleepTrials(false)}}/>
        </Box>
      </Modal>
    </Paper>
  );
};

export default CurrentSleepTrialTrackers;

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Modal,
  Button,
  Tab,
  Tabs,
} from '@material-ui/core';
import styles from './SleepTrialTracker.module.css';
import LinkOnClick from '../linkOnClick/LinkOnClick';
import SleepTrialsView from '../../views/sleepTrials/SleepTrialsView';
import CurrentSleepTrialsSubPanel from './CurrentSleepTrialsSubPanel';
import CompletedSleepTrialsSubPanel from './CompletedSleepTrialsSubPanel';
import TabPanel from '../tabPanel/TabPanel';

const CurrentSleepTrialTrackers = ({ trialTrackers }) => {
  const initTabValue = () => Number(window.localStorage.getItem('SleepTrialTrackerPanel_Tab')) || 0;
  const [showSleepTrials, setShowSleepTrials] = useState(false);
  const [tabValue, setTabValue] = useState(initTabValue);

  useEffect(() => {
    window.localStorage.setItem('SleepTrialTrackerPanel_Tab', tabValue);
  }, [tabValue]);

  const handleTabSelect = (e, newValue) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  const closeSleepTrialsModal = () => {
    setShowSleepTrials(false);
  };

  return (
    <Paper elevation={24} style={{ minHeight: '100vh' }}>
      <Box p={4} py={3}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">
              Sleep Trials
            </Typography>
            <p className={styles.heroSubText}>This is where you can track your progress towards completing sleep trials.</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LinkOnClick onClick={() => { setShowSleepTrials(true); }}>
              <Button color="primary" fullWidth variant="contained" disableElevation>Start A Sleep Trial</Button>
            </LinkOnClick>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Tabs value={tabValue} onChange={handleTabSelect} variant="fullWidth">
          <Tab label="Current" disableRipple />
          <Tab label="Completed" disableRipple />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={tabValue} index={0}>
          <CurrentSleepTrialsSubPanel trialTrackers={trialTrackers} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CompletedSleepTrialsSubPanel trialTrackers={trialTrackers} />
        </TabPanel>
      </Box>

      <Modal
        className={styles.modal}
        open={showSleepTrials}
        style={{ display: showSleepTrials ? 'inline' : 'none' }}
        onClose={closeSleepTrialsModal}
        keepMounted
      >
        <>
          <SleepTrialsView handleCloseClick={() => { setShowSleepTrials(false); }} />
        </>
      </Modal>
    </Paper>
  );
};

export default CurrentSleepTrialTrackers;

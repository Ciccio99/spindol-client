import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Modal,
  Button,
} from '@material-ui/core';

import TypeList from '../typeList/TypeList';
import styles from './CurrentSleepTrialTrackers.module.css';
import LinkOnClick from '../../linkOnClick/LinkOnClick';
import SleepTrialsView from '../../../views/sleepTrials/SleepTrialsView';

const CurrentSleepTrialTrackers = ({ trialTrackers }) => {
  const [showSleepTrials, setShowSleepTrials] = useState(false);
  const [trialTypes, setTrialTypes] = useState({});

  useEffect(() => {
    const trialObj = {
      Behavior: [],
      Supplement: [],
      Environment: [],
      Hardware: [],
    };

    trialTrackers.forEach(trialTracker => {
      trialObj[trialTracker.sleepTrial.type].push(trialTracker);
    });
    setTrialTypes(trialObj);
  }, [trialTrackers]);



  return (
    <Paper className={styles.paper} elevation={0}>
      <Box pl={3} pt={4} pr={3} pb={3}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          spacing={3}
        >
          <Grid item xs={12} sm={8}>
            <Typography variant='h5'>
              Your current sleep trials
            </Typography>
            <p className={styles.heroSubText}>This is where you can track your progress towards completing sleep trials.</p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LinkOnClick onClick={() => {setShowSleepTrials(true)}}>
              <Button className={styles.button} variant='outlined' size='small' disableElevation>View Sleep Trials</Button>
            </LinkOnClick>
          </Grid>
        </Grid>
      </Box>
      {trialTrackers.length === 0
        ? <Box pl={3} pt={4} pr={3} pb={3}><Typography variant='h4'>You haven't started tracking any sleep trials! Select a sleep trial to start tracking your progress!</Typography></Box>
        :<Box>
        {
          Object.keys(trialTypes).map((key) => {
            const trialTrackers = trialTypes[key];
            return trialTrackers.length > 0
              ? <TypeList key={key} type={key} trialTrackers={trialTypes[key]}/>
              : null;
          })
        }
      </Box>}
      <Modal
        className={styles.modal}
        open={showSleepTrials}
        onClose={() => {setShowSleepTrials(false)}}
      >
        <Box display='flex' justifyContent='center'>
          <SleepTrialsView handleCloseClick={() => {setShowSleepTrials(false)}}/>
        </Box>
      </Modal>
    </Paper>
  );
};

export default CurrentSleepTrialTrackers;

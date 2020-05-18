import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import TypeList from 'components/sleepTrialTracker/TypeList';
import SleepTrialTracker from 'components/sleepTrialTracker/SleepTrialTracker'
import CompletedSTT from 'components/sleepTrialTracker/CompletedSTT';
import utils from 'utils/SleepTrialTracker';

const CompletedSleepTrialsSubPanel = ({ trialTrackers }) => {
  const [trialTypes, setTrialTypes] = useState({});

  useEffect(() => {
    if (trialTrackers.length === 0) {
      return;
    }
    const formattedTrials = utils.formatCompletedTrials(trialTrackers);
    setTrialTypes(formattedTrials);
  }, [trialTrackers]);

  if (trialTrackers.length === 0) {
    return (
      <Box pl={3} pt={4} pr={3} pb={3}>
        <Typography variant='h4'>
          You haven't started tracking any sleep trials! Select a sleep trial to start tracking your progress!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {
        Object.keys(trialTypes).map((key) => {
          const sleepTrialTrackers = trialTypes[key];
          return sleepTrialTrackers.length > 0
            ? <TypeList key={key} type={key} trialTrackers={trialTypes[key]} component={CompletedSTT}/>
            : null;
        })
      }
    </Box>
  );
};

export default CompletedSleepTrialsSubPanel;

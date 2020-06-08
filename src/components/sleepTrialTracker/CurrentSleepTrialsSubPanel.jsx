import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import TypeList from 'components/sleepTrialTracker/TypeList';
import SleepTrialTracker from 'components/sleepTrialTracker/SleepTrialTracker';
import utils from 'utils/SleepTrialTracker';

const CurrentSleepTrialsSubPanel = ({ trialTrackers }) => {
  const [trialTypes, setTrialTypes] = useState({});

  useEffect(() => {
    if (trialTrackers.length === 0) {
      return;
    }
    const formattedTrials = utils.formatCurrentTrials(trialTrackers);
    setTrialTypes(formattedTrials);
  }, [trialTrackers]);

  if (trialTrackers.length === 0) {
    return (
      <Box pl={3} pt={4} pr={3} pb={3}>
        <Typography variant="h6">
          No sleep trials started yet...
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
            ? (
              <TypeList
                key={key}
                type={key}
                trialTrackers={trialTypes[key]}
                component={SleepTrialTracker}
              />
            )
            : null;
        })
      }
    </Box>
  );
};

export default CurrentSleepTrialsSubPanel;

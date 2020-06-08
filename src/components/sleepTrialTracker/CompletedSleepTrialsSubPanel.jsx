import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  LinearProgress,
} from '@material-ui/core';
import TypeList from 'components/sleepTrialTracker/TypeList';
import CompletedSTT from 'components/sleepTrialTracker/CompletedSTT';
import utils from 'utils/SleepTrialTracker';

const CompletedSleepTrialsSubPanel = ({ trialTrackers }) => {
  const [trialTypes, setTrialTypes] = useState({});
  const [trialsCompleted, setTrialsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trials = trialTrackers.filter((stt) => stt.completed);
    if (trials.length === 0) {
      setTrialsCompleted(false);
      setIsLoading(false);
      return;
    }

    const formattedTrials = utils.formatCompletedTrials(trialTrackers);
    setTrialTypes(formattedTrials);
    setTrialsCompleted(true);
    setIsLoading(false);
  }, [trialTrackers]);

  if (isLoading) {
    return (
      <Box m={3} pt={3}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  if (!trialsCompleted) {
    return (
      <>
        <Divider />
        <Box pl={3} pt={4} pr={3} pb={3}>
          <Typography variant="h6">
            You haven't completed any sleep trials yet. Once you finish your first sleep trial you can find the results of that trial here.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box>
      {
        Object.keys(trialTypes).map((key) => {
          const sleepTrialTrackers = trialTypes[key];
          return sleepTrialTrackers.length > 0
            ? <TypeList key={key} type={key} trialTrackers={trialTypes[key]} component={CompletedSTT} />
            : null;
        })
      }
    </Box>

  );
};

export default CompletedSleepTrialsSubPanel;

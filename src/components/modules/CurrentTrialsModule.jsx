import React from 'react';
import {
  LinearProgress,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { useAsync } from 'react-async';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import PanelModule from 'components/organizers/PanelModule';
import SleepTrialTrackerMin from 'components/dailyDiaryDetailsPanel/sleepTrialTrackerMin/SleepTrialTrackerMin';

const TITLE = 'Sleep Trials';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const CurrentTrialsModule = ({ date }) => {
  const currentDate = date || moment().format('YYYY-MM-DD');
  const { data, error, isPending } = useAsync({
    promiseFn: SleepTrialTrackerServices.getByDate,
    date: currentDate,
  });

  if (isPending) {
    return (
      <PanelWrapper>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }
  if (error) {
    return (
      <PanelWrapper>
        <Typography variant="subtitle1" color="error">Something went wrong...</Typography>
      </PanelWrapper>
    );
  }

  if (data && data.length > 0) {
    const trialTrackers = data.map((tracker) => (
      <SleepTrialTrackerMin key={tracker._id} sleepTrialTracker={tracker} date={currentDate} />
    ));
    return (
      <PanelWrapper>
        {trialTrackers}
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <Typography variant="body1">No sleep trials...</Typography>
    </PanelWrapper>
  );
};

export default CurrentTrialsModule;

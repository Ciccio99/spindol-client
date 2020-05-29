import React, { useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';
import UserContext from 'context/userContext';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import SleepTrialTrackerPanel from 'components/sleepTrialTracker/SleepTrialTrackerPanel';
import StatsDisplay from 'components/statsDisplay/StatsDisplay';
import DailyDiaryPanel from 'components/dailyDiaryPanel/DailyDiaryPanel';

const DashboardView = () => {
  const { user } = useContext(UserContext);
  const { sleepTrialTrackers, dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const userFirstName = user.name ? user.name.split(' ')[0] : '';

  useEffect(() => {
    (async () => {
      const trialTrackersData = await SleepTrialTrackerServices.querySleepTrialTracker();
      if (trialTrackersData.length === 0) {
        return;
      }
      dispatchSleepTrialTrackers({
        type: 'POPULATE',
        sleepTrialTrackers: trialTrackersData,
      });
    })();
  }, [dispatchSleepTrialTrackers, user]);

  return (
    <Box mb={4}>
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant="h3">
            {`Welcome${userFirstName ? ` ${userFirstName}` : ''}!`}
          </Typography>
        </Box>
        <DailyDiaryPanel />
        <StatsDisplay />
        <SleepTrialTrackerPanel trialTrackers={sleepTrialTrackers} />
      </Container>
    </Box>
  );
};

export default DashboardView;

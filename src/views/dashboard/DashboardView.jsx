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
import Section from 'components/organizers/Section';

const DashboardView = () => {
  const { user } = useContext(UserContext);
  const { sleepTrialTrackers, dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const userFirstName = user.name ? user.name.split(' ')[0] : '';

  useEffect(() => {
    (async () => {
      const trialTrackersData = await SleepTrialTrackerServices.querySleepTrialTracker();

      dispatchSleepTrialTrackers({
        type: 'POPULATE',
        sleepTrialTrackers: trialTrackersData,
      });
    })();
  }, [dispatchSleepTrialTrackers, user]);

  return (
    <Box mb={4}>
      <Container>
        <Box mt={5}>
          <Typography variant="h3">
            {`Welcome${userFirstName ? ` ${userFirstName}` : ''}!`}
          </Typography>
        </Box>
        <Section>
          <DailyDiaryPanel />
        </Section>
        <Section>
          <StatsDisplay />
        </Section>
        <Section>
          <SleepTrialTrackerPanel trialTrackers={sleepTrialTrackers} />
        </Section>
      </Container>
    </Box>
  );
};

export default DashboardView;

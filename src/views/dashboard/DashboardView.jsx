import React, { useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import UserContext from 'context/userContext';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import SleepTrialTrackerPanel from 'components/sleepTrialTracker/SleepTrialTrackerPanel';
import MoodModule from 'components/modules/MoodModule';
import FatigueModule from 'components/modules/FatigueModule';
import SleepComparisonModule from 'components/modules/SleepComparisonModule';
import Section from 'components/organizers/Section';
import ConnectDeviceCTA from 'components/cta/ConnectDevice';

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
      <Helmet>
        <title>Hypnos.ai - Dashboard</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use the dashboard to set your daily mood, check in to your sleep trials and see what your sleep has been lately."
        />
      </Helmet>
      <Container style={{ overflowX: 'hidden' }}>
        <Box mt={5}>
          <Typography variant="h3">
            {`Welcome${userFirstName ? ` ${userFirstName}` : ''}!`}
          </Typography>
        </Box>
        {
          !user.accounts.oura.connected
          && !user.accounts.withings.connected
          && !user.accounts.fitbit.connected
          && (
          <Section>
            <ConnectDeviceCTA />
          </Section>
          )
        }
        <Section>
          <MoodModule />
        </Section>
        <Section>
          <Box>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <FatigueModule />
              </Grid>
              <Grid item xs={12} md={6}>
                <SleepComparisonModule />
              </Grid>
            </Grid>
          </Box>
        </Section>
        {/* <Section>
          <SleepComparisonModule />
        </Section> */}
        <Section>
          <SleepTrialTrackerPanel trialTrackers={sleepTrialTrackers} />
        </Section>
      </Container>
    </Box>
  );
};

export default DashboardView;

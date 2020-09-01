import React, { useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet-async';
import { useUserState } from 'context/userContext';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import SleepTrialTrackerPanel from 'components/sleepTrialTracker/SleepTrialTrackerPanel';
import DailyDiaryDashboardModule from 'components/modules/DailyDiaryDashboardModule';
import SleepComparisonModule from 'components/modules/SleepComparisonModule';
import HabitModule from 'components/modules/HabitModule';
import Section from 'components/organizers/Section';
import ConnectDeviceCTA from 'components/cta/ConnectDevice';
import useMedium from 'hooks/useMedium';

const DashboardView = () => {
  const user = useUserState();
  const { isMedium } = useMedium();
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
      <Container>
        <Box mt={4}>
          <Typography variant="h5">
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
          <DailyDiaryDashboardModule date={moment()} tagsDate={moment().subtract(1, 'day')} enableStreak />
        </Section>
        <Section>
          <Grid container>
            <Grid component={Grid} item xs={12} md={6}>
              <Box mr={isMedium ? 0 : 4} height={isMedium ? 'auto' : '100%'}>
                <SleepComparisonModule />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={isMedium ? 8 : 0} height={isMedium ? 'auto' : '100%'}>
                <HabitModule />
              </Box>
            </Grid>
          </Grid>
        </Section>
        <Section>
          <SleepTrialTrackerPanel trialTrackers={sleepTrialTrackers} />
        </Section>
      </Container>
    </Box>
  );
};

export default DashboardView;

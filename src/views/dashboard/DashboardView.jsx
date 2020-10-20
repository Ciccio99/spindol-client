import React, { useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Grid,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet-async';
import { useUserState } from 'context/userContext';
import DailyDiaryDashboardModule from 'components/modules/DailyDiaryDashboardModule';
import SleepComparisonModule from 'components/modules/SleepComparisonModule';
import Section from 'components/organizers/Section';
import SessionStepper from 'components/SessionStepper';
import ConnectDeviceCTA from 'components/cta/ConnectDevice';
import useMedium from 'hooks/useMedium';
import 'components/dashboard/WeekMoodModule';
import WeekMoodModule from 'components/dashboard/WeekMoodModule';

const DashboardView = () => {
  const user = useUserState();

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
        {/* <Section>
          <SessionStepper />
        </Section> */}
        <Section>
          <DailyDiaryDashboardModule date={moment()} tagsDate={moment().subtract(1, 'day')} enableStreak />
        </Section>
        <Section>
          <WeekMoodModule />
        </Section>
        <Section>
          <SleepComparisonModule />
        </Section>
        {/* <Section>
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
        </Section> */}
      </Container>
    </Box>
  );
};

export default DashboardView;

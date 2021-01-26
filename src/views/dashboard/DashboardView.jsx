import React from 'react';
import {
  Container,
  Box,
  Grid,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { useUserState } from 'context/userContext';
import Section from 'components/common/Section';
import ConnectDeviceCTA from 'components/cta/ConnectDevice';
import useMobile from 'hooks/useMobile';
import WeekMoodModule from 'components/dashboard/WeekMoodModule';
// import StreakModule from 'components/dashboard/StreakModule';
import SleepModule from 'components/dashboard/SleepModule';
import SleepChartModule from 'components/dashboard/SleepChartModule';
import SleepGoalsModule from 'components/dashboard/SleepGoalsModule';
import Journal from 'components/dashboard/Journal';

// Temporary while check-in experience is being made
import DailyDiaryDashboardModule from 'components/modules/DailyDiaryDashboardModule';
import moment from 'moment-timezone';


// const useStyles = makeStyles((theme) => ({
//   gridItemTopMargin: {
//     marginTop: theme.spacing(8),
//   },
// }));

const DashboardView = () => {
  const user = useUserState();
  const { isMobile } = useMobile();
  // const classes = useStyles();
  const yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');

  return (
    <Box mb={4}>
      <Helmet>
        <title>Hypnos - Dashboard</title>
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
        <Journal />
        <Section>
          <DailyDiaryDashboardModule tagsDate={yesterdayDate} />
        </Section>
        <Section>
          <Grid container justify="space-between" spacing={isMobile ? 0 : 6}>
            <Grid item xs={12} sm={7} md={8} lg={8}>
              <WeekMoodModule />
            </Grid>
            {/* <Grid item xs={12} sm={5} md={4} lg={4} className={clsx({ [classes.gridItemTopMargin]: isMobile })}>
              <StreakModule />
            </Grid> */}
          </Grid>
        </Section>
        <Section>
          <SleepGoalsModule />
        </Section>
        <Section>
          <SleepChartModule />
        </Section>
        <Section>
          <SleepModule />
        </Section>
      </Container>
    </Box>
  );
};

export default DashboardView;

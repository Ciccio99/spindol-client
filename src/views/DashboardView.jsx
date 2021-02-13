import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { useUserState } from 'context/userContext';
import { useDailyDiary } from 'hooks/useDailyDiary';
import useAssignShapes from 'hooks/useAssignShapes';
import { isCheckedInDiary } from 'utils/diary-utils';
import Section from 'components/common/Section';
import ConnectDeviceCTA from 'components/cta/ConnectDevice';
import useMobile from 'hooks/useMobile';
import WeekMoodModule from 'components/dashboard/WeekMoodModule';
import StreakModule from 'components/dashboard/StreakModule';
import SleepModule from 'components/dashboard/SleepModule';
import SleepChartModule from 'components/dashboard/SleepChartModule';
import SleepGoalsModule from 'components/dashboard/SleepGoalsModule';
import Journal from 'components/dashboard/Journal';
import CheckInCta from 'components/dashboard/CheckInCta';

const useStyles = makeStyles((theme) => ({
  gridItemTopMargin: {
    marginTop: theme.spacing(6),
  },
}));

const DashboardView = () => {
  const classes = useStyles();
  const user = useUserState();
  const { data } = useDailyDiary();
  const { isMobile } = useMobile();

  useAssignShapes();

  return (
    <Box mb={4}>
      <Helmet>
        <title>Spindol - Dashboard</title>
        <meta
          name="description"
          content="Spindol helps you track and improve your sleep habits. Use the dashboard to set your daily mood, check in to your sleep trials and see what your sleep has been lately."
        />
      </Helmet>
      <Container>
        {!user.accounts.oura.connected &&
          !user.accounts.withings.connected &&
          !user.accounts.fitbit.connected && (
            <Section>
              <ConnectDeviceCTA />
            </Section>
          )}
        <Journal />
        {isCheckedInDiary(data) ? null : (
          <Section>
            <CheckInCta />
          </Section>
        )}
        <Section>
          <Grid container justify="space-between" spacing={isMobile ? 0 : 6}>
            <Grid item xs={12} sm={7} md={8} lg={8}>
              <WeekMoodModule />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={4}
              className={clsx({ [classes.gridItemTopMargin]: isMobile })}
            >
              <StreakModule />
            </Grid>
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

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';
import UserContext from '../../context/userContext';
import SleepTrialTrackersContext from '../../context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from '../../services/SleepTrialTrackerServices';
import CurrentSleepTrialTrackers from '../../components/sleepTrialTracker/currentSleepTrialTrackers/CurrentSleepTrialTrackers';
import StatsDisplay from '../../components/statsDisplay/StatsDisplay';
import DailyDiaryPanel from '../../components/dailyDiaryPanel/DailyDiaryPanel';


const DashboardView = () => {
  const { user } = useContext(UserContext);
  const { sleepTrialTrackers, dispatchSleepTrialTrackers} = useContext(SleepTrialTrackersContext);
  const userFirstName = user.name ? user.name.split(' ')[0] : '';

  useEffect(() => {
    async function fetchData() {
      try {
        const match = { owner: user._id };
        const trialTrackersData = await SleepTrialTrackerServices.querySleepTrialTracker(match);

        dispatchSleepTrialTrackers({
          type: 'POPULATE',
          sleepTrialTrackers: trialTrackersData,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatchSleepTrialTrackers, user._id]);

  return (
    <Box mb={4}>
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant='h3'>
              Welcome{userFirstName ? ' ' + userFirstName : ''}, let's get you some better sleep!
          </Typography>
        </Box>
        <DailyDiaryPanel/>
        <StatsDisplay/>
        <CurrentSleepTrialTrackers trialTrackers={sleepTrialTrackers}/>
      </Container>
    </Box>
  );
}

export default DashboardView;

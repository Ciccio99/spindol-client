import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../context/userContext';
import SleepTrialTrackerServices from '../../services/SleepTrialTrackerServices';
import CurrentSleepTrialTrackers from '../../components/sleepTrialTracker/currentSleepTrialTrackers/CurrentSleepTrialTrackers';
import StatsDisplay from '../../components/statsDisplay/StatsDisplay';

const DashboardScreen = () => {
  const { user } = useContext(UserContext);
  const [trialTrackers, setTrialTrackers] = useState([]);
  const userFirstName = user.name.split(' ')[0];

  useEffect(() => {
    async function fetchData() {
      try {
        const trialTrackersData = await SleepTrialTrackerServices.querySleepTrialTracker({
          match: { owner: user._id},
        });
        setTrialTrackers(trialTrackersData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // Get Trial Trackers
  }, [user]);

  return (
    <Box mb={4}>
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant='h3'>
              Welcome{userFirstName ? ' ' + userFirstName : ''}, let's get you some better sleep!
          </Typography>
        </Box>
        {/* <h1 className={styles.welcome}>Welcome{userFirstName ? ' ' + userFirstName : ''}, let's get you some better sleep!</h1> */}
        <StatsDisplay/>
        {trialTrackers.length > 0 ? <CurrentSleepTrialTrackers trialTrackers={trialTrackers}/> : null}
      </Container>
    </Box>
  );
}

export default DashboardScreen;

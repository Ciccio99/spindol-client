import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import UserContext from '../../context/userContext';
import SleepTrialTrackerServices from '../../services/SleepTrialTrackerServices';
import CurrentSleepTrialTrackers from '../../components/sleepTrialTracker/currentSleepTrialTrackers/CurrentSleepTrialTrackers';

const DashboardScreen = () => {
  const { user, dispatch } = useContext(UserContext);
  const [trialTrackers, setTrialTrackers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  return (
    <Container>
      <h1>Welcome, let's get you some better sleep!</h1>
      {trialTrackers.length > 0 ? <CurrentSleepTrialTrackers trialTrackers={trialTrackers}/> : null}
    </Container>
  );
}

export default DashboardScreen;

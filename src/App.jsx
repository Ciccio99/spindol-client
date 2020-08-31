import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import DeviceServices from 'services/DeviceServices';
import UserServices from 'services/UserServices';
import AppRouter from 'routes/AppRouter';
import ScrollToTop from 'routes/ScrollToTop';
import devices from 'constants/devices';
import {
  useUserDispatch,
} from 'context/userContext';
import { setUserId, Event } from 'utils/Tracking';
import Header from './views/header/Header';
import Footer from './views/footer/Footer';
import SleepTrialTrackersContext from './context/sleepTrialTrackersContext';
import sleepTrialTrackersReducer from './reducers/sleepTrialTrackersReducer';
import LoadingCard from './components/loadingCard/LoadingCard';

// TODO: Upgrade to cleaner context system store https://kentcdodds.com/blog/how-to-use-react-context-effectively
// TODO: REactGA improvement https://medium.com/@malith.dev/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8#:~:text=That's%20it.,%2D%3EEvents%2D%3EOverview.

function App() {
  const dispatchUser = useUserDispatch();
  const [sleepTrialTrackers, dispatchSleepTrialTrackers] = useReducer(
    sleepTrialTrackersReducer, [],
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { user: currentUser } = await UserServices.tokenSignIn();
      if (currentUser) {
        dispatchUser({
          type: 'USER_LOGIN',
          user: currentUser,
        });
        if (currentUser.accounts.oura.connected) {
          await DeviceServices.syncDeviceData(devices.OURA);
        } else if (currentUser.accounts.withings.connected) {
          await DeviceServices.syncDeviceData(devices.WITHINGS);
        } else if (currentUser.accounts.fitbit.connected) {
          await DeviceServices.syncDeviceData(devices.FITBIT);
        }

        setUserId(currentUser._id);
        Event('User', 'User Sign In');
      }
      setLoaded(true);
    })();
  }, [dispatchUser]);

  return (
    <SleepTrialTrackersContext.Provider
      value={{ sleepTrialTrackers, dispatchSleepTrialTrackers }}
    >
      <Box minHeight="100vh" display="flex" flexDirection="column" component="main">
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          {loaded ? <AppRouter /> : <LoadingCard />}
          <Footer />
        </BrowserRouter>
      </Box>
    </SleepTrialTrackersContext.Provider>
  );
}

export default App;

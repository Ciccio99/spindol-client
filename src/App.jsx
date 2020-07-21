import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import ReactGA from 'react-ga';
import DeviceServices from 'services/DeviceServices';
import UserServices from 'services/UserServices';
import AppRouter from 'routes/AppRouter';
import ScrollToTop from 'routes/ScrollToTop';
import devices from 'constants/devices';
import Header from './views/header/Header';
import Footer from './views/footer/Footer';
import UserContext from './context/userContext';
import userReducer from './reducers/user';
import {
  AlertSystemProvider,
} from 'context/alertSystemContext';
import SleepTrialTrackersContext from './context/sleepTrialTrackersContext';
import sleepTrialTrackersReducer from './reducers/sleepTrialTrackersReducer';
import LoadingCard from './components/loadingCard/LoadingCard';
import AlertSystemModule from 'components/alertSystem/AlertSystemModule';

// TODO: Upgrade to cleaner context system store https://kentcdodds.com/blog/how-to-use-react-context-effectively

function App() {
  const [user, dispatchUser] = useReducer(userReducer, {});
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
        ReactGA.set({
          userId: currentUser._id,
          userEmail: currentUser.email,
        });
        ReactGA.event({
          category: 'User',
          action: 'User Sign In',
          value: parseInt(currentUser._id, 10),
        });
      }
      setLoaded(true);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, dispatchUser }}
    >
      <AlertSystemProvider>
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
        <AlertSystemModule />
      </AlertSystemProvider>
    </UserContext.Provider>
  );
}

export default App;

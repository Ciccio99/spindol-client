import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Snackbar,
  Box,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ReactGA from 'react-ga';
import DeviceServices from 'services/DeviceServices';
import UserServices from 'services/UserServices';
import AppRouter from 'routes/AppRouter';
import ScrollToTop from 'routes/ScrollToTop';
import Header from './views/header/Header';
import Footer from './views/footer/Footer';
import UserContext from './context/userContext';
import userReducer from './reducers/user';
import AlertSystemContext from './context/alertSystemContext';
import alertSystemReducer from './reducers/alertSystem';
import SleepTrialTrackersContext from './context/sleepTrialTrackersContext';
import sleepTrialTrackersReducer from './reducers/sleepTrialTrackersReducer';
import LoadingCard from './components/loadingCard/LoadingCard';
// TODO: Upgrade to cleaner context system store https://kentcdodds.com/blog/how-to-use-react-context-effectively

function App() {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [sleepTrialTrackers, dispatchSleepTrialTrackers] = useReducer(
    sleepTrialTrackersReducer, [],
  );
  const [alertSystem, dispatchAlertSystem] = useReducer(alertSystemReducer, { open: false });
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
          await DeviceServices.syncDeviceData('oura');
        } else if (currentUser.accounts.withings.connected) {
          await DeviceServices.syncDeviceData('withings');
        } else if (currentUser.accounts.fitbit.connected) {
          await DeviceServices.syncDeviceData('fitbit');
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

  const handleAlertClose = () => {
    dispatchAlertSystem({
      type: 'CLOSE',
    });
  };

  return (
    <UserContext.Provider
      value={{ user, dispatchUser }}
    >
      <AlertSystemContext.Provider
        value={{ alertSystem, dispatchAlertSystem }}
      >
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
        <Snackbar open={alertSystem.open} autoHideDuration={5000} onClose={handleAlertClose}>
          <MuiAlert severity={alertSystem.severity} onClose={handleAlertClose} elevation={1} variant="filled">
            {alertSystem.message}
          </MuiAlert>
        </Snackbar>
      </AlertSystemContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

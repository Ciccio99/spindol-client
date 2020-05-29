import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Snackbar,
  Box,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from './loaders/axios';
import AppRouter from './routes/AppRouter';
import Header from './views/header/Header';
import UserContext from './context/userContext';
import userReducer from './reducers/user';
import AlertSystemContext from './context/alertSystemContext';
import alertSystemReducer from './reducers/alertSystem';
import SleepTrialTrackersContext from './context/sleepTrialTrackersContext';
import sleepTrialTrackersReducer from './reducers/sleepTrialTrackersReducer';
import LoadingCard from './components/loadingCard/LoadingCard';
import DeviceServices from './services/DeviceServices';

function App() {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [sleepTrialTrackers, dispatchSleepTrialTrackers] = useReducer(
    sleepTrialTrackersReducer, [],
  );
  const [alertSystem, dispatchAlertSystem] = useReducer(alertSystemReducer, { open: false });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let currentUser;
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/users/me`);
        if (data.user) {
          currentUser = data.user;
        }
      } catch (error) {}


      if (currentUser) {
        dispatchUser({
          type: 'USER_LOGIN',
          user: currentUser,
        });
        if (user.accounts.oura.connected) {
          await DeviceServices.syncDeviceData('oura');
        }
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
          <main>
            <BrowserRouter>
              <Header />
              {loaded ? <AppRouter /> : <LoadingCard />}
            </BrowserRouter>
          </main>
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

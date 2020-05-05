import React, { useState, useEffect, useReducer }from 'react';
import { BrowserRouter } from 'react-router-dom';
// import axios from 'axios';
import axios from './loaders/axios';
import AppRouter from './routes/AppRouter';
import Header from './views/header/Header';
import UserContext from './context/userContext';
import userReducer from './reducers/user';
import SleepTrialTrackersContext from './context/sleepTrialTrackersContext';
import sleepTrialTrackersReducer from './reducers/sleepTrialTrackersReducer';

import LoadingCard from './components/loadingCard/LoadingCard';
import Cookies from 'js-cookie';

function App() {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [sleepTrialTrackers, dispatchSleepTrialTrackers] = useReducer(sleepTrialTrackersReducer, []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      let user = undefined;
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/users/me`);
        user = data.user;
      } catch (error) {
      }
      if (user) {
        dispatchUser({
          type: 'USER_LOGIN',
          user,
        });
      }
      setLoaded(true)
    }
    fetchUser();
  }, []);

  return (
      <UserContext.Provider value={{ user, dispatchUser }}>
        <SleepTrialTrackersContext.Provider value={{ sleepTrialTrackers, dispatchSleepTrialTrackers}}>
          <main>
            <BrowserRouter>
              <Header/>
              {loaded ? <AppRouter/> : <LoadingCard/>}
            </BrowserRouter>
          </main>
        </SleepTrialTrackersContext.Provider>
      </UserContext.Provider>
  );
}

export default App;

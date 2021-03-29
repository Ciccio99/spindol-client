import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
// import { loadIntercom } from 'next-intercom';
import DeviceServices from 'services/DeviceServices';
import UserServices from 'services/UserServices';
import AppRouter from 'routes/AppRouter';
import ScrollToTop from 'routes/ScrollToTop';
import devices from 'constants/devices';
import { useUserDispatch } from 'context/userContext';
import { setUserId, Event } from 'utils/Tracking';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingCard from './components/loadingCard/LoadingCard';
import '@stripe/stripe-js';

function App() {
  const dispatchUser = useUserDispatch();
  const [loaded, setLoaded] = useState(false);
  // loadIntercom({
  //   appId: 'jfn9k2mu',
  //   initWindow: true,
  // });

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
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      component="main"
    >
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        {loaded ? <AppRouter /> : <LoadingCard />}
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;

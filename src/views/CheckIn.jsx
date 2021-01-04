import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckInPanel from 'components/checkIn/CheckInPanel';


const CheckIn = () => (
  <>
    <Helmet>
      <title>Hypnos - Check-In</title>
    </Helmet>
    <CheckInPanel />
  </>
);

export default CheckIn;

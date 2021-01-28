import React from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core';
import ROUTES from 'constants/routes';

const Copyright = () => (
  <Typography variant="caption" color="textSecondary" noWrap>
    {'© '}
    <Link color="inherit" href={ROUTES.landingPage} target="_blank" rel="noopener noreferrer">
      Spindol
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

export default Copyright;

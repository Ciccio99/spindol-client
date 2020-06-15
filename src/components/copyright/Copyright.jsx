import React from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core';

const Copyright = () => (
  <Typography variant="caption" color="textSecondary">
    {'© '}
    <Link color="inherit" href="https://sleepwell.ai/" target="_blank">
      Sleepwell.ai
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

export default Copyright;

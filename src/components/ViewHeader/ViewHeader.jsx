import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';

const ViewHeader = ({ label }) => (
  <Box mt={4}>
    <Typography variant="h5">
      {label}
    </Typography>
  </Box>
);

export default ViewHeader;

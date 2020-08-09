import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';

const ViewHeader = ({ children }) => (
  <Box mt={4}>
    <Typography variant="h5">
      {children}
    </Typography>
  </Box>
);

export default ViewHeader;

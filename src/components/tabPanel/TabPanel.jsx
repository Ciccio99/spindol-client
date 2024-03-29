import React from 'react';
import {
  Box,
} from '@material-ui/core';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={ value !== index}
      {...other}
    >
      <Box hidden={ value !== index}>
        {children}
      </Box>
    </div>
  );
};

export default TabPanel;

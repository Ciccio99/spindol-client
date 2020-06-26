import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography,
  Tooltip,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styles from './Dashboard.module.css';

const PanelModule = ({ children, title, tooltip }) => (
  <Paper elevation={24}>
    <Box px={4} py={3} display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{title}</Typography>
      {
        tooltip
        && (
          <Tooltip title={<Typography variant="body2" component="div" className={styles.tooltip}>{tooltip}</Typography>}>
            <HelpOutlineIcon fontSize="small" color="primary" />
          </Tooltip>
        )
      }

    </Box>
    <Divider />
    <Box p={4}>
      {children}
    </Box>
  </Paper>
);

export default PanelModule;

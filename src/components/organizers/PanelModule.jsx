import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography,
  Tooltip,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styles from './Organizers.module.css';

const PanelModule = ({ children, title, subtitle, tooltip }) => (
  <Paper elevation={24} style={{ minHeight: '100%' }}>
    <Box px={4} py={3} display="flex" justifyContent="space-between">
      <Box maxWidth="80%">
        <Typography variant="h6">{title}</Typography>
        { subtitle && <Typography variant="subtitle2" color="textSecondary">{subtitle}</Typography>}
      </Box>
      {
        tooltip
        && (
          <Tooltip
            enterTouchDelay={50}
            title={<Typography variant="body2" component="div" className={styles.tooltip}>{tooltip}</Typography>}
          >
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

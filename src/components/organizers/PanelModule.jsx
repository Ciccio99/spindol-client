import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styles from './Organizers.module.css';

const useStyles = makeStyles({
  elevation24: {
    boxShadow: 'rgba(230, 126, 86, 0.75) 0px 2px 24px 5px',
  },
});

const PanelModule = ({
  children, title, subtitle, tooltip, enableCTA,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={24} style={{ minHeight: '100%' }} classes={enableCTA ? ({ elevation24: classes.elevation24 }) : {}}>
      <Box px={4} py={3} display="flex" justifyContent="space-between">
        <Box maxWidth={tooltip ? '80%' : '100%'}>
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
      {/* <Divider /> */}
      <Box p={4} pt={2}>
        {children}
      </Box>
    </Paper>
  );
};

export default PanelModule;

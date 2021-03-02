import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  anim: {
    animation: `$appear 0.4s ${theme.transitions.easing.easeInOut}`,
  },
  elevation24: {
    boxShadow: 'rgba(230, 126, 86, 0.75) 0px 2px 24px 5px',
  },
  '@keyframes appear': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  tooltip: {
    padding: theme.spacing(1),
  },
}));

const PanelModule = ({
  children, title, subtitle, tooltip, enableCTA,
}) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={24}
      style={{ minHeight: '100%' }}
      className={clsx(classes.anim, { [classes.elevation24]: enableCTA })}
    >
      <Box px={4} pt={3} pb={1} display="flex" justifyContent="space-between">
        <Box maxWidth={tooltip ? '80%' : '100%'}>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>{title}</Typography>
          { subtitle && <Typography variant="subtitle2" color="textSecondary">{subtitle}</Typography>}
        </Box>
        {
        tooltip
        && (
          <Tooltip
            enterTouchDelay={50}
            title={<Typography variant="body2" component="div" className={classes.tooltip}>{tooltip}</Typography>}
          >
            <HelpOutlineIcon fontSize="small" color="primary" />
          </Tooltip>
        )
      }

      </Box>
      {/* <Divider /> */}
      <Box p={4} pt={4}>
        {children}
      </Box>
    </Paper>
  );
};

export default PanelModule;

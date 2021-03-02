import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidePanel from 'components/common/SidePanel';
import { Box, Typography } from '@material-ui/core';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  hideButton: {
    color: COLORS.DARK_BLUE,
    cursor: 'pointer',
  },
  subHeader: {
    color: COLORS.RED,
    marginBottom: theme.spacing(1),
  },
  details: {
    whiteSpace: 'pre-wrap',
  },
}));

export default function SleepActivityPanel({ activity, onClose }) {
  const classes = useStyles();

  return (
    <SidePanel>
      <Box display="flex" flexDirection="column" py={3} px={3}>
        <Box>
          <Typography
            className={classes.hideButton}
            variant="body1"
            align="right"
            onClick={onClose}
          >
            Hide
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">{activity.name}</Typography>
        </Box>
        <Box mt={4}>
          <Typography className={classes.subHeader} variant="h4">
            Directions
          </Typography>
          <Typography variant="body1">{activity.directions}</Typography>
        </Box>
        <Box mt={3}>
          <Typography className={classes.subHeader} variant="h4">
            Details
          </Typography>
          <Typography className={classes.details} variant="body1">
            {activity.description}
          </Typography>
        </Box>
      </Box>
    </SidePanel>
  );
}

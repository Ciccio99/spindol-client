import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import moment from 'moment-timezone';
import styles from './Modals.module.css';

const CompletedSTTModal = ({ trialTracker, handleCloseClick }) => (
  <Box m={1} display="flex" justifyContent="center">
    <Paper>
      <Box display="flex" justifyContent="flex-end" pr={1} pt={1}>
        <CancelOutlinedIcon color="action" className={styles.closeButton} onClick={handleCloseClick} />
      </Box>
      <Box p={3} pt={4} pb={4} minWidth="50vw" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">
          <span role="img" aria-label="Celebration Emoji">🎉</span>
          {' Congratulations! '}
          <span role="img" aria-label="Celebration Emoji">🎉</span>
        </Typography>
        <Typography variant="subtitle1">
          You completed your trial!
        </Typography>
        <Box mt={4}>
          <Box mb={1}>
            <Typography variant="subtitle2" color="textSecondary">Trial:</Typography>
            <Typography variant="h6">
              {trialTracker.sleepTrial.name}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle2" color="textSecondary">Started:</Typography>
            <Typography variant="h6">
              {`${moment.utc(trialTracker.startDate).format('MMM DD, YYYY')}`}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle2" color="textSecondary">Finished:</Typography>
            <Typography variant="h6">
              {`${moment.utc(trialTracker.endDate).format('MMM DD, YYYY')}`}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle2" color="textSecondary">Time to Complete:</Typography>
            <Typography variant="h6">
              {`${moment.utc(trialTracker.endDate).diff(moment.utc(trialTracker.startDate), 'days')} days`}
            </Typography>
          </Box>
          <Box mt={5} mb={1}>
            <Link className={styles.link} to={`/sleep-trial-report/${trialTracker._id}`}>
              <Button color="primary" size="medium" fullWidth variant="contained" disableElevation>View Trial Report</Button>
            </Link>
          </Box>
          <Box mb={1}>
            <Typography variant="caption" color="textSecondary">
              You can view all your completed trials under the "Completed"
              <br />
              {' '}
              tab in your Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  </Box>
);

export default CompletedSTTModal;

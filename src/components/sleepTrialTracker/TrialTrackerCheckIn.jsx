import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Modal,
  Paper,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import ToggleButtonGroup from 'components/buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from 'components/buttons/toggleButton/ToggleButton';
import CompletedSTTModal from 'components/modals/CompletedSTTModal';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './SleepTrialTracker.module.css';

const TrialTrackerCheckIn = ({ trialTracker }) => {
  const { dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [completed, setCompleted] = useState(null);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const yesterdayDate = moment().subtract(1, 'day');

  useEffect(() => {
    const existingCheckIn = trialTracker.checkIns.find((checkIn) => {
      const checkInDate = moment(checkIn.date);
      return moment(checkInDate.utc().format('YYYY-MM-DD')).isSame(moment(yesterdayDate.format('YYYY-MM-DD')), 'day');
    });

    if (existingCheckIn) {
      setCompleted(existingCheckIn.completed);
    }
  }, [trialTracker, yesterdayDate]);

  const submitCheckIn = async (done) => {
    const sleepTrialTracker = await SleepTrialTrackerServices.addCheckIn(
      trialTracker._id,
      yesterdayDate.format('YYYY-MM-DD'),
      done,
    );
    if (sleepTrialTracker) {
      dispatchSleepTrialTrackers({
        type: 'UPDATE',
        sleepTrialTracker,
      });
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Updated Trial!',
      });
      if (sleepTrialTracker.completed) {
        setShowCompletedModal(true);
      }
      return true;
    }
    dispatchAlertSystem({
      type: 'WARNING',
      message: 'Failed to update trial. Please try again later.',
    });
    return false;
  };

  return (
    <>
      <Box border={1} borderColor="#DBDBDB" borderRadius={10} p={2}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Did you perform this trial yesterday?</Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">The night of <strong>{yesterdayDate.format('MMM D, YYYY')}</strong></Typography>
              </Grid>
              {/* <Grid item><Typography variant='caption'>{trialTracker.sleepTrial.type} Trial</Typography></Grid> */}
            </Grid>
          </Grid>
          <ToggleButtonGroup item container xs={12} sm={6} spacing={1} justify="space-around" alignItems="center" onChange={submitCheckIn} value={completed}>
            <ToggleButton xs={6} sm={5} value>Yes, I did</ToggleButton>
            <ToggleButton xs={6} sm={5} value={false}>No, I didn't</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Box>
      <Modal
        open={showCompletedModal}
        onClose={() => { setShowCompletedModal(false); }}
        onBackdropClick={() => { setShowCompletedModal(false); }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableAutoFocus
        disableEnforceFocus
      >
        <>
          <CompletedSTTModal
            trialTracker={trialTracker}
            handleCloseClick={() => { setShowCompletedModal(false); }}
          />
        </>
      </Modal>
    </>
  );
};

export default TrialTrackerCheckIn;

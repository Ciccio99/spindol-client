import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinkOnClick from 'components/linkOnClick/LinkOnClick';
import CancelSTTModal from 'components/modals/CancelSTTModal';
import TrialTrackerCheckIn from './TrialTrackerCheckIn';
import SleepTrialTrackerContext from 'context/sleepTrialTrackersContext';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './SleepTrialTracker.module.css';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';

const useStyles = makeStyles({
  root: {
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    'border-radius': '50px',
  },
  colorPrimary: {
    'background-color': '#EBEBEB',
  },
  barColorPrimary: {
    background: 'linear-gradient(90deg, rgba(250,200,86,1) 0%, rgba(215,70,78,1) 100%)',
  },
});

const SleepTrialTracker = ({ trialTracker }) => {
  const { dispatchSleepTrialTrackers } = useContext(SleepTrialTrackerContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [completedDays, setCompletedDays] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const completedCheckIns = trialTracker.checkIns
      .filter((checkIn) => checkIn.completed !== false);

    setCompletedDays(completedCheckIns.length);
    let progress = Math.round((completedCheckIns.length / trialTracker.trialLength) * 100);
    if (progress > 100) {
      progress = 100;
    }
    setCompletionProgress(progress);
  }, [trialTracker]);

  const cancelSTT = async () => {
    const { success, error } = await SleepTrialTrackerServices.removeById(trialTracker._id);
    if (success) {
      dispatchSleepTrialTrackers({
        type: 'REMOVE',
        id: trialTracker._id,
      });
      setShowCancelModal(false);
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Sleep Trial Cancelled',
      });
    } else if (error) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: error.message,
      });
      setShowCancelModal(false);
    }
  };

  return (
    <Box mt={6}>
      <Grid container justify="space-between" spacing={1}>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            value={completionProgress}
            classes={{
              root: classes.root,
              colorPrimary: classes.colorPrimary,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box pt={3}>
            <h3 className={styles.trialName}>{trialTracker.sleepTrial.name}</h3>
            <p className={styles.trialDescription}>{trialTracker.sleepTrial.shortDescription}</p>
            <Typography />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box pt={3}>
            <ul className={styles.list}>
              <li className={styles.completion}>
                {`${completedDays}/${trialTracker.trialLength} days complete`}
              </li>
              <li className={styles.trialLength}>
                {trialTracker.trialLength}
                {' '}
                day trial period
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item><Typography variant="body1">Directions:</Typography></Grid>
          <Grid item><Typography variant="body1"><strong>{trialTracker.sleepTrial.directions}</strong></Typography></Grid>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <TrialTrackerCheckIn trialTracker={trialTracker} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box py={2} px={1} display="flex" justifyContent="flex-end">
            <LinkOnClick onClick={() => { setShowCancelModal(true); }} errorColor>
              Cancel Sleep Trial
            </LinkOnClick>
          </Box>
          <Modal
            open={showCancelModal}
            onClose={() => { setShowCancelModal(false); }}
            onBackdropClick={() => { setShowCancelModal(false); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disableAutoFocus
            disableEnforceFocus
          >
            <>
              <CancelSTTModal
                trialTrackerName={trialTracker.sleepTrial.name}
                handleConfirmClick={cancelSTT}
                handleCloseClick={() => { setShowCancelModal(false); }}
              />
            </>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SleepTrialTracker;

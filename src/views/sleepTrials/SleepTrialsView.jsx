import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  Paper,
  Box,
  Typography,
  Container,
  Divider,
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import AlertSystemContext from 'context/alertSystemContext';
import SleepTrialCard from 'components/sleepTrial/SleepTrialCard';
import SleepTrialTypeList from '../../components/sleepTrial/sleepTrialTypeList/SleepTrialTypeList';
import SleepTrialServices from '../../services/SleepTrialServices';
import styles from './SleepTrialsView.module.css';

const SleepTrialsView = ({ handleCloseClick }) => {
  const { sleepTrialTrackers, dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [sleepTrials, setSleepTrials] = useState([]);
  const [sleepTrialTypes, setSleepTrialTypes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await SleepTrialServices.query();
        setSleepTrials(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const startSleepTrial = async (sleepTrial) => {
      const sleepTrialTracker = await SleepTrialTrackerServices.create(sleepTrial);
      if (sleepTrialTracker) {
        dispatchSleepTrialTrackers({
          type: 'ADD',
          sleepTrialTracker,
        });
        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Sleep trial started!',
        });
      }
    };

    if (sleepTrials.length === 0) {
      return;
    }
    const trialsObj = {
      Behavior: [],
      Supplement: [],
      Environment: [],
      Hardware: [],
    };

    sleepTrials.forEach((sleepTrial) => {
      const tracked = sleepTrialTrackers
        .some((sleepTrialTracker) => (
          sleepTrialTracker.sleepTrial._id === sleepTrial._id
          && !sleepTrialTracker.completed
        ));

      trialsObj[sleepTrial.type].push(
        <Box key={sleepTrial._id}>
          <SleepTrialCard
            sleepTrial={sleepTrial}
            tracked={tracked}
            onStartHandle={() => { startSleepTrial(sleepTrial); }}
          />
          <Divider />
        </Box>,
      );
    });
    setSleepTrialTypes(trialsObj);
  }, [sleepTrials, sleepTrialTrackers, dispatchAlertSystem, dispatchSleepTrialTrackers]);

  return (
    <Container maxWidth="md">
      <Box mt={2} display="flex" justifyContent="center">
        <Paper elevation={0} className={styles.paper}>
          <Box display="flex" justifyContent="flex-end" pr={2} pt={2}>
            <CancelOutlinedIcon className={styles.closeButton} onClick={handleCloseClick} />
          </Box>
          <Box px={4} py={2} pt={0}>
            <Typography variant="h4">Sleep Trials</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {`${sleepTrials.length} sleep trials available`}
            </Typography>
          </Box>
          <Divider />
          { loading
            ? null
            : (
              <Box>
                { Object.keys(sleepTrialTypes).length === 0
                  ? <Box p={4}><Typography variant="h6">No Sleep Trials Found</Typography></Box>
                  : Object.keys(sleepTrialTypes).map((key) => {
                    const sleepTrialCards = sleepTrialTypes[key];
                    return sleepTrials.length > 0
                      ? <SleepTrialTypeList key={key} type={key} sleepTrials={sleepTrialCards} />
                      : null;
                  })}
              </Box>
            )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SleepTrialsView;

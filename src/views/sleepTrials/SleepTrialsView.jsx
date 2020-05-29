import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import styles from './SleepTrialsView.module.css';
import SleepTrialServices from '../../services/SleepTrialServices';
import SleepTrialTypeList from '../../components/sleepTrial/sleepTrialTypeList/SleepTrialTypeList';

const SleepTrialsView = ({ handleCloseClick }) => {
  const [sleepTrialTypes, setSleepTrialTypes] = useState({});
  const [trialsCount, setTrialsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const trialsObj = {
      Behavior: [],
      Supplement: [],
      Environment: [],
      Hardware: [],
    };
    (async () => {
      try {
        const data = await SleepTrialServices.query();
        data.forEach((sleepTrial) => {
          trialsObj[sleepTrial.type].push(sleepTrial);
        });
        setTrialsCount(data.length);
        setSleepTrialTypes(trialsObj);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  return (
    <Box m={2} maxWidth={1000}>
      <Paper elevation={0} className={styles.paper}>
        <Box display="flex" justifyContent="flex-end" pr={1} pt={1}>
          <CancelOutlinedIcon className={styles.closeButton} onClick={handleCloseClick} />
        </Box>
        <Box m={2} mt={0}>
          <Box p={3} pb={0} pt={0} mb={2}>
            <Typography variant="h4">Sleep Trials</Typography>
            { trialsCount === 0
              ? null
              : (
                <Typography variant="subtitle2">
                  {`${trialsCount} sleep trials available`}
                </Typography>
              )}
          </Box>
          { loading
            ? null
            : (
              <Box>
                { Object.keys(sleepTrialTypes).length === 0
                  ? <Typography variant="h3">No Sleep Trials Found</Typography>
                  : Object.keys(sleepTrialTypes).map((key) => {
                    const sleepTrials = sleepTrialTypes[key];
                    return sleepTrials.length > 0
                      ? <SleepTrialTypeList key={key} type={key} sleepTrials={sleepTrials} />
                      : null;
                  })}
              </Box>
            )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SleepTrialsView;

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SleepTrialCard from '../../components/sleepTrial/SleepTrialCard';
import styles from './SleepTrialsView.module.css';
import SleepTrialServices from '../../services/SleepTrialServices';
import SleepTrialTypeList from '../../components/sleepTrial/sleepTrialTypeList/SleepTrialTypeList';

const SleepTrialsView = ({ handleCloseClick }) => {
  // const [sleepTrials, setSleepTrials] = useState([]);
  const [sleepTrialTypes, setSleepTrialTypes] = useState({});

  useEffect(() => {
    const trialsObj = {
      Behavior: [],
      Supplement: [],
      Environment: [],
      Hardware: [],
    };
    async function fetchData() {
      try {
        const data = await SleepTrialServices.query();
        data.forEach((sleepTrial) => {
          trialsObj[sleepTrial.type].push(sleepTrial);
        });
        setSleepTrialTypes(trialsObj);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  return (
    <Box m={2}>
      <CancelOutlinedIcon className={styles.closeButton} onClick={handleCloseClick}/>
      <Paper elevation={0} className={styles.paper}>
        <Box m={2}>
          <Box p={3} pb={0}>
            <Typography variant='h4'>Sleep Trials</Typography>
          </Box>
          <Box>
            {
              Object.keys(sleepTrialTypes).length === 0
              ? <Typography variant='h3'>No Sleep Trials Found</Typography>
              : Object.keys(sleepTrialTypes).map((key, index) => {
                  const sleepTrials = sleepTrialTypes[key];
                  return sleepTrials.length > 0
                    ? <SleepTrialTypeList key={key} type={key} sleepTrials={sleepTrials}/>
                    : null;
                })
            }
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SleepTrialsView;

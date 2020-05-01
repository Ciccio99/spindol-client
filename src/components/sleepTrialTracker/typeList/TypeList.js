import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import SleepTrialTracker from '../SleepTrialTracker';
import styles from './TypeList.module.css';

const TypeList = ({ type, trialTrackers}) => {

  return (
    <React.Fragment>
      <Divider/>
      <Box p={3}>
        <h4 className={styles.typeHeader}>{type} Objectives</h4>
        {trialTrackers.map((trialTracker) =>
          trialTracker.completed
          ? null
          : <SleepTrialTracker key={trialTracker._id} trialTracker={trialTracker}/>)
        }
      </Box>

    </React.Fragment>

  );
}

export default TypeList;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Chip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './SleepTrialCard.module.css';

const SleepTrialCard = ({ sleepTrial, tracked, onStartHandle }) => {
  const [expanded, setExpanded] = useState(false);
  const cta = tracked
    ? (
      <Button className={styles.startTrialButton} variant="outlined" fullWidth size="medium" disabled disableElevation>
        Currently being tracked
      </Button>
    )
    : (
      <Button onClick={onStartHandle} fullWidth color="primary" variant="contained" size="large" disableElevation>
        Start sleep trial
      </Button>
    );

  return (
    <Box my={5}>
      <Grid container justify="space-between">
        <Grid item container xs={12} justify="space-between">
          <Grid item xs={12} sm="auto">
            <Typography variant="h6" paragraph>{sleepTrial.name}</Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box mb={2}>
              <Typography variant="subtitle2" className={styles.trialLength}>
                {sleepTrial.trialLength}
                {' '}
                day trial period
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{sleepTrial.shortDescription}</Typography>
          <Box my={3}>
            <ExpansionPanel expanded={expanded} onChange={() => { setExpanded(!expanded); }} elevation={0} classes={{ root: styles.expansionPanelRoot }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2">View More Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body1">{sleepTrial.description}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="caption" display="block">
              <strong>Directions:</strong>
            </Typography>
            <Typography variant="caption" display="block">
              {sleepTrial.directions}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="caption" gutterBottom display="block">
              <strong>Areas of Effect:</strong>
            </Typography>
            <Box>
              {(
                sleepTrial.areasOfEffect.map((effect) => (<Chip label={effect} key={effect} className={styles.chip} color="secondary" variant="outlined" />))
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={3} my={2}>
            {cta}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(SleepTrialCard);

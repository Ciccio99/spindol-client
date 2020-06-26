import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import PanelModule from 'components/dashboard/PanelModule';
import SleepSummaryServices from 'services/SleepSummaryServices';

const TITLE = 'Fatigue Score';
const TOOLTIP = 'Your fatigue score represents your ability to achieve your tasks for the day. The lower your score, the less fatigued you will be throughout your day.'
  + ' If your fatigue level is High or Extreme, you might find it strenous to perform standard tasks. Moreover you should be careful when operating dangerous/heavy machinery.';

const useStyles = makeStyles({
  root: {
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    'border-radius': '50px',
  },
  colorPrimary: {
    background: 'linear-gradient(315deg, rgba(218,80,87,1) 0%, rgba(230,126,86,1) 33.33%, rgba(250,200,86,1) 66.66%, rgb(143, 239, 155) 100%)',
  },
  barColorPrimary: {
    background: 'transparent',
    borderRight: '5px solid #0F0F0F',
  },
});

const getFatigueLevel = (score) => {
  if (score < 25) return 'Low';
  if (score < 50) return 'Moderate';
  if (score < 75) return 'High';
  return 'Extreme';
};

const getFatigueColor = (score) => {
  if (score < 25) return 'rgb(143, 239, 155)';
  if (score < 50) return 'rgba(250,200,86,1)';
  if (score < 75) return 'rgba(230,126,86,1)';
  return 'rgba(218,80,87,1)';
};

const FatigueModule = () => {
  const [fatigueState, setFatigueState] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setIsFetching(true);
    (async () => {
      const today = moment().format('YYYY-MM-DD');
      const { data } = await SleepSummaryServices.getFatigueScore(today);
      if (data && data.fatigueScore >= 0) {
        setFatigueState({
          score: Math.round(data.fatigueScore),
          level: getFatigueLevel(data.fatigueScore),
          color: getFatigueColor(data.fatigueScore),
        });
      }
      setIsFetching(false);
    })();
  }, []);

  if (isFetching) {
    return (
      <PanelModule title={TITLE} tooltip={TOOLTIP}>
        <Box>
          <LinearProgress color="secondary" />
        </Box>
      </PanelModule>
    );
  }

  if (!fatigueState) {
    return (
      <PanelModule title={TITLE} tooltip={TOOLTIP}>
        <Typography variant="body1">
          {'Fatigue score can only be calculated if your last night\'s and previous night\'s sleep data are synced.'}
        </Typography>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={TITLE} tooltip={TOOLTIP}>
      <Grid container alignItems="center" justify="center" spacing={4}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h2" align="center" style={{ color: fatigueState.color }}>{fatigueState.score}</Typography>
          <Typography variant="h6" align="center">{`${fatigueState.level} Fatigue`}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <LinearProgress
            value={fatigueState.score}
            variant="determinate"
            classes={{
              root: classes.root,
              colorPrimary: classes.colorPrimary,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
          <Box p={1} px={0.5} display="flex" justifyContent="space-between">
            <Typography variant="caption" display="inline" color="textSecondary">Low</Typography>
            <Typography variant="caption" display="inline" color="textSecondary">Exteme</Typography>
          </Box>

        </Grid>
      </Grid>
    </PanelModule>
  );
};

export default FatigueModule;

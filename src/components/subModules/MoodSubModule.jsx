import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import DailyDiaryServices from 'services/DailyDiaryServices';
import ToggleButtonGroup from 'components/buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from 'components/buttons/toggleButton/ToggleButton';
import { Event } from 'utils/Tracking';
import { StreakBox } from 'components/Streaks';

const getDateSubtitle = (date = moment()) => {
  const givenDate = moment.utc(date);
  const now = moment();

  if (now.diff(givenDate, 'day') === 0) {
    return (
      <Box>
        <Typography variant="subtitle1" display="inline">
          {'How did you feel upon waking up '}
        </Typography>
        <Typography variant="subtitle1" color="primary" display="inline">
          <strong>this morning</strong>
        </Typography>
        <Typography variant="subtitle1" display="inline">
          ?
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="subtitle1" display="inline">
        {'How did you feel the upon waking the morning of '}
      </Typography>
      <Typography variant="subtitle1" color="primary" display="inline">
        <strong>{givenDate.format('dddd, MMM DD')}</strong>
      </Typography>
      <Typography variant="subtitle1" display="inline">
        ?
      </Typography>
    </Box>
  );
};

const MoodSubModule = ({ date, mood, handleUpdate, enableStreak }) => {
  const [streak, setStreak] = useState(0);
  const handleMoodUpdate = React.useCallback((selectedMood) => {
    Event('Daily Diary', 'Edited Mood', selectedMood);
    const dto = { mood: selectedMood };
    handleUpdate(dto);
  }, [handleUpdate]);

  useEffect(() => {
    if (!enableStreak) {
      return;
    }
    (async () => {
      const data = await DailyDiaryServices.getReportingStreak();
      setStreak(data);
    })();
  }, [enableStreak, mood]);

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        <Grid item>
          {getDateSubtitle(date)}
          {/* <Typography variant="subtitle2"><strong>How did your sleep make you feel this morning?</strong></Typography> */}
        </Grid>
        {
          streak > 0
          && (
            <Grid item>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <StreakBox value={streak} />
                {/* <Box py={1}>
                  <Typography variant="subtitle2" display="inline">{' 🔥 Keep it up, you\'re doing great!'}</Typography>
                </Box> */}
              </Box>

            </Grid>
          )
          }
        <ToggleButtonGroup item container xs={12} sm={12} spacing={1} alignItems="center" justify="space-between" onChange={handleMoodUpdate} value={mood || null}>
          <ToggleButton value="excellent" xs={6} sm={2}>Excellent</ToggleButton>
          <ToggleButton value="good" xs={6} sm={2}>Good</ToggleButton>
          <ToggleButton value="meh" xs={6} sm={2}>Meh</ToggleButton>
          <ToggleButton value="bad" xs={6} sm={2}>Bad</ToggleButton>
          <ToggleButton value="awful" xs={6} sm={2}>Awful</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Box>
  );
};

MoodSubModule.defaultProps = {
  disableSteak: false,
};

export default MoodSubModule;

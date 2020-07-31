import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import DailyDiaryServices from 'services/DailyDiaryServices';
import ToggleButtonGroup from 'components/buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from 'components/buttons/toggleButton/ToggleButton';

const MoodSubModule = ({ mood, handleUpdate, enableStreak }) => {
  const [streak, setStreak] = useState(0);
  const handleMoodUpdate = React.useCallback((selectedMood) => {
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
  }, [enableStreak]);

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="subtitle2"><strong>How are you feeling today?</strong></Typography>
        </Grid>
        {
          streak > 0
          && (
            <Grid item>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Box px={2} py={1} mr={1} display="inline" borderRadius={5} style={{ backgroundColor: '#FAC856', color: '#FFFFFF' }}>
                  <Typography variant="subtitle2" display="inline"><strong>{`${streak} Day Streak`}</strong></Typography>
                </Box>
                <Box py={1}>
                  <Typography variant="subtitle2" display="inline">{' 🔥 Keep it up, you\'re doing great!'}</Typography>
                </Box>
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

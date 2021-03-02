import { Box, Grid, Popover } from '@material-ui/core';
import MoodCard from 'components/common/MoodCard';
import { MOODS } from 'constants/mood';
import React from 'react';

export default function MoodEditor({ anchorElement, mood, onSelect, onClose }) {
  const onClickHandle = (selectedMood) => {
    onSelect(selectedMood);
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      elevation={0}
    >
      <Box p={3} maxWidth={400}>
        <Grid container spacing={2}>
          {Object.keys(MOODS).map((moodKey) => (
            <Grid item key={moodKey} xs={12}>
              <MoodCard
                mood={MOODS[moodKey]}
                selected={MOODS[moodKey] === mood}
                onClick={() => {
                  onClickHandle(MOODS[moodKey]);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
}

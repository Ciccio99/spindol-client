import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoodEditor from 'components/dailyDiary/MoodEditor';
import COLORS from 'constants/colors';
import { getMoodComponent } from 'constants/mood';
import { useDailyDiary, useUpdateDailyDiary } from 'hooks/useDailyDiary';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  accentText: {
    color: COLORS.RED,
  },
  moodText: {
    textTransform: 'capitalize',
  },
  editText: {
    color: COLORS.DARK_BLUE,
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
}));

export default function MoodModule({ date }) {
  const classes = useStyles();
  const { data, isLoading } = useDailyDiary(date);
  const { updateDailyDiary } = useUpdateDailyDiary();
  const [editorAnchorEl, setEditorAnchorEl] = useState(null);

  const onEditorOpenHandle = (event) => {
    setEditorAnchorEl(event.currentTarget);
  };

  const onEditorCloseHandle = () => {
    setEditorAnchorEl(null);
  };

  const onEditorMoodSelect = (mood) => {
    const dto = {
      _id: data._id,
      mood,
    };
    updateDailyDiary({ data: dto, date });
  };

  if (isLoading || !data) {
    return null;
  }

  const MoodComponent = getMoodComponent(data.mood);

  return (
    <div>
      <div>
        <Typography variant="subtitle1">
          <span className={classes.accentText}>Mood</span>
        </Typography>
      </div>
      <Box mt={2}>
        <Paper elevation={24}>
          <Box py={3} px={3}>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <MoodComponent width={180} height={180} />
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Typography variant="overline" className={classes.moodText}>
                {data.mood}
              </Typography>
            </Box>
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Typography
                variant="subtitle1"
                display="inline"
                className={classes.editText}
                onClick={onEditorOpenHandle}
              >
                Edit Mood
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <MoodEditor
        anchorElement={editorAnchorEl}
        mood={data.mood}
        onClose={onEditorCloseHandle}
        onSelect={onEditorMoodSelect}
      />
    </div>
  );
}

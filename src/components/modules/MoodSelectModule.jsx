import React from 'react';
import {
  FormControl,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import DailyDiaryServices from 'services/DailyDiaryServices';
import PanelModule from 'components/organizers/PanelModule';
import MOOD_COLOR_MAP from 'constants/moodColor';

const TITLE = 'Mood';

const updateHandle = ([dto]) => DailyDiaryServices.update(dto);

const MoodSelectModule = ({ date }) => {
  const [oldData, setOldData] = React.useState(null);
  const { data, error, isPending, isRejected, run, setData } = useAsync({
    promiseFn: DailyDiaryServices.getDashboardData,
    date,
    deferFn: updateHandle,
  });
  const dispatchAlert = useAlertSystemDispatch();

  const updateMood = (mood) => {
    setOldData(data);
    const dto = { _id: data._id, mood };
    setData({ ...data, mood });
    run(dto);
  };

  if (isRejected) {
    if (oldData) {
      setData(oldData);
    }
    dispatchAlert({
      type: 'WARNING',
      message: error.message,
    });
  }

  if (error) {
    return (
      <PanelModule title={TITLE}>
        <Typography variant="subtitle1">{error.message}</Typography>
      </PanelModule>
    );
  }

  if (!data && isPending) {
    return (
      <PanelModule title={TITLE}>
        <LinearProgress color="secondary" />
      </PanelModule>
    );
  }

  if (data) {
    return (
      <PanelModule title={TITLE}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item>
            {
            data.mood
              ? (
                <Typography variant="h6">
                  {'You felt '}
                  <span style={{ color: MOOD_COLOR_MAP[data.mood] }}>{data.mood}</span>
                  {' '}
                  on this day.
                </Typography>
              )
              : <Typography variant="h6">No mood set for this day...</Typography>
          }
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth color="secondary" size="medium" disabled={isPending}>
              <InputLabel htmlFor="mood-select">Edit Mood</InputLabel>
              <Select
                labelId="mood-select"
                value={data.mood || ''}
                label="Edit Mood"
                onChange={(e) => updateMood(e.target.value)}
              >
                <MenuItem value="excellent">Excellent</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="meh">Meh</MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
                <MenuItem value="awful">Awful</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </PanelModule>
    );
  }

  return null;
};

export default MoodSelectModule;

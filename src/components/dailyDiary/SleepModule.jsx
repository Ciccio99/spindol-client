import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SleepCard from 'components/common/SleepCard';
import COLORS from 'constants/colors';
import { useSleepSummary } from 'hooks/useSleepSummary';
import React from 'react';

const useStyles = makeStyles(() => ({
  accentText: {
    color: COLORS.RED,
  },
}));

export default function SleepModule({ date }) {
  const classes = useStyles();
  const { data, isLoading } = useSleepSummary(date);

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <div>
        <Typography variant="subtitle1">
          <span className={classes.accentText}>Sleep</span>
        </Typography>
      </div>
      <Box mt={2}>
        <Grid container spacing={2}>
          {Object.values(data).map((sleepStat) => (
            <Grid item key={sleepStat.description} xs={6}>
              <SleepCard
                stat={sleepStat.stat}
                units={sleepStat.units}
                description={sleepStat.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

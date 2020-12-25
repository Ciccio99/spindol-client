import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import dataScientistSvg from 'assets/home/img_data-scientist.svg';
import sleepTherapistSvg from 'assets/home/img_sleep-therapist.svg';
import sleepJournalSvg from 'assets/home/img_diary.svg';

const useStyles = makeStyles(() => ({
  heroBackground: {
    background: COLORS.WHITE,
  },
}));

const ComboInfoPanel = () => {
  const classes = useStyles();
  return (
    <Box p={6} pb={0} width="100%" className={classes.heroBackground}>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Typography variant="overline" style={{ maxWidth: 540 }}>
          Hypnos is like having a Data Scientist, Sleep Therapist, and Diary all in one.
        </Typography>
      </Box>
      <Box mt={10}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
              <img alt="Data Scientist" src={dataScientistSvg} style={{ maxWidth: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
              <img alt="Sleep Therapist" src={sleepTherapistSvg} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
              <img alt="Sleep Diary" src={sleepJournalSvg} style={{ maxWidth: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ComboInfoPanel;

import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMedium from 'hooks/useMedium';
import COLORS from 'constants/colors';
import insights1Svg from 'assets/home/01_insight.svg';
import insights2Svg from 'assets/home/02_insight.svg';
import insights3Svg from 'assets/home/03_insight.svg';
import sleepWakeTimeSvg from 'assets/home/img_sleep-wake-time.svg';
import moodTagsSvg from 'assets/home/img_mood-tags.svg';
import idealSleepSvg from 'assets/home/img_ideal-sleep.svg';

const useStyles = makeStyles(() => ({
  grayBackground: {
    background: COLORS.GRAY_BACKGROUND,
  },
  insightImage: {
    marginTop: 16,
    maxWidth: '100%',
  },
  translate1: {
    transform: 'translate(14.4%)',
  },
  translate2: {
    transform: 'translate(28.8%)',
  },
  translate1Mobile: {
    transform: 'translate(7.2%)',
  },
  translate2Mobile: {
    transform: 'translate(14.4%)',
  },
  translateMoodTag: {
    transform: 'translate(0, -100px)',
  },
  translateSleepWakeTime: {
    transform: 'translate(0, -40px)',
  },
}));

const DetailsPanel = () => {
  const classes = useStyles();
  const { isMedium } = useMedium();

  return (
    <Box p={6} pb={14} width="100%" className={classes.grayBackground}>
      <Box width="100%">
        <Typography variant="overline">
          One place for
        </Typography>
        <Typography variant="overline">
          everything sleep
        </Typography>
      </Box>
      <Box mt={isMedium ? 5 : 8}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box pr={isMedium ? 10 : 5} display="flex" flexDirection="column" alignItems="start">
              <img src={insights1Svg} alt="First Sleep Insight" style={{ maxWidth: '100%' }} />
              <img
                src={insights2Svg}
                alt="Second Sleep Insight"
                className={clsx(classes.insightImage, {
                  [classes.translate1]: !isMedium,
                  [classes.translate1Mobile]: isMedium,
                })}
              />
              <img
                src={insights3Svg}
                alt="Third Sleep Insight"
                className={clsx(classes.insightImage, {
                  [classes.translate2]: !isMedium,
                  [classes.translate2Mobile]: isMedium,
                })}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <Box maxWidth={480}>
                <Typography variant="h1" gutterBottom>
                  We give you insight and recommendation on your sleep and activity
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  Using your sleep tracker data and the information you provide us we help you improve your sleep.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={isMedium ? 5 : 16}>
        <Grid container spacing={6} direction={isMedium ? 'column-reverse' : null}>
          <Grid item xs={12} md={6}>
            <Box maxWidth={400}>
              <Typography variant="h1" gutterBottom>
                Get better at waking up and getting to bed on time.
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                We track when you wake up and fall asleep so we can help guide you to reaching your goals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={sleepWakeTimeSvg} alt="Sleep-Wake Time Module" className={clsx({ [classes.translateSleepWakeTime]: !isMedium })} style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={isMedium ? 5 : 16}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <img src={moodTagsSvg} alt="Mood-Tags Module" className={clsx({ [classes.translateMoodTag]: !isMedium })} style={{ maxWidth: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <Box maxWidth={440}>
                <Typography variant="h1" gutterBottom>
                  Understand what makes you happy and improve your sleep
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  Our daily activities and routines can have significant impact on our sleep and our moods. We’ll help you discover which work and which don’t!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={isMedium ? 5 : 16}>
        <Grid container spacing={6} direction={isMedium ? 'column-reverse' : null}>
          <Grid item xs={12} md={6}>
            <Box maxWidth={480}>
              <Typography variant="h1" gutterBottom>
                Find out what your ideal amount of sleep is
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                We’ve all heard 8 hours of sleep is best, but depending on who you are that might be different. We’ll hone in on your optimal sleep time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={idealSleepSvg} alt="Ideal sleep module" style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailsPanel;

import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useBreakpoint from 'hooks/useBreakpoint';
import COLORS from 'constants/colors';
import howWorks1 from 'assets/img_01_how-it-works.svg';
import howWorks2 from 'assets/img_02_how-it-works.svg';
import howWorks3 from 'assets/home/img_03_how-it-works.svg';
import howWorks4 from 'assets/img_04_how-it-works.svg';

const useStyles = makeStyles((theme) => ({
  heroBackground: {
    background: COLORS.WHITE,
  },
  textBottomPadding: {
    paddingBottom: theme.spacing(2),
  },
  countNumber: {
    color: COLORS.DARK_BLUE,
    paddingBottom: theme.spacing(1),
  },
  imgContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(7),
    height: 125,
    display: 'flex',
  },
}));

const pDict = {
  xs: 3,
  sm: 3,
  md: 3,
  lg: 5,
  xl: 5,
};

const HowItWorksPanel = () => {
  const classes = useStyles();
  const { breakpoint } = useBreakpoint();
  const px = React.useMemo(() => pDict[breakpoint], [breakpoint]);

  return (
    <Box display="flex" flexDirection="column" width="100vw" className={clsx(classes.heroBackground)}>
      <Box py={4} pl={px}>
        <Typography variant="overline">
          How it Works
        </Typography>
      </Box>
      <Grid container alignItems="stretch">
        <Grid item xs={12} sm={6} md={3} style={{ background: COLORS.PINK }}>
          <Box width="100%" p={px} pt={10} display="flex" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 1 - Connect Tracker" src={howWorks1} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>01</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Connect your favorite sleep tracker</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              No need to get a new sleep tracker, use the one you already own. We currently support Oura, Withings. With support for Fitbit, Whoop and Apple Healthkit coming soon.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ background: COLORS.PEACH_1 }}>
          <Box width="100%" p={px} pt={10} display="flex" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 2 - Track your sleep nightly" src={howWorks2} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>02</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>We track your sleep nightly</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              Every night, we automatically take in your sleep tracker data. No need to manually import any sleep data.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ background: COLORS.PEACH_3 }}>
          <Box width="100%" p={px} pt={10} display="flex" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 3 - Analyze your Data" src={howWorks3} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>03</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Then we analyze the data for you</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              We utilize your activities, mood and sleep data to crunch the numbers on how your habits impact you.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ background: COLORS.PEACH_2 }}>
          <Box width="100%" p={px} pt={10} display="flex" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 4 - Provide insights and repeat" src={howWorks4} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>04</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Finally, we provide you insight and repeat the process.</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              With new insights, comes personal improvements. Keep utilizing Hypnos to keep a pulse on your mood, habits and sleep.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorksPanel;

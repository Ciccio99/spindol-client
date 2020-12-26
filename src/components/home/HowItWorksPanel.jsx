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
    color: COLORS.RED,
    paddingBottom: theme.spacing(1),
  },
  imgContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  stepsImg: {
    paddingBottom: theme.spacing(7),
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
        <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
          <Box height="60vh" width="100%" p={px} pt={10} style={{ background: COLORS.PINK }} display="flex" justifyContent="flex-end" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 1 - Connect Tracker" src={howWorks1} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>01</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Connect your favorite sleep tracker</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              What matters most for a majority of people when it comes to sleep is their daily habits and activities.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box height="60vh" width="100%" p={px} pt={10} display="flex" style={{ background: COLORS.PEACH_1 }} justifyContent="flex-end" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 2 - Track your sleep nightly" src={howWorks2} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>02</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Connect your favorite sleep tracker</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              What matters most for a majority of people when it comes to sleep is their daily habits and activities.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box height="60vh" width="100%" p={px} pt={10} display="flex" style={{ background: COLORS.PEACH_3 }} justifyContent="flex-end" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 3 - Analyze your Data" src={howWorks3} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>03</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Connect your favorite sleep tracker</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              What matters most for a majority of people when it comes to sleep is their daily habits and activities.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box height="60vh" width="100%" p={px} pt={10} display="flex" style={{ background: COLORS.PEACH_2 }} justifyContent="flex-end" flexDirection="column">
            <div className={classes.imgContainer}>
              <img alt="Step 4 - Provide insights and repeat" src={howWorks4} className={classes.stepsImg} />
            </div>
            <Typography variant="h4" className={classes.countNumber}>04</Typography>
            <Typography variant="h2" className={classes.textBottomPadding}>Connect your favorite sleep tracker</Typography>
            <Typography variant="subtitle1" color="textPrimary">
              What matters most for a majority of people when it comes to sleep is their daily habits and activities.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorksPanel;

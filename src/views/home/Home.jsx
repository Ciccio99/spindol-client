import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Helmet } from 'react-helmet-async';
import Section from 'components/organizers/Section';
import sleepImg from 'assets/sleep-analysis.svg';
import sleepTrackerImg from 'assets/private-data.svg';
import COLORS from 'constants/colors';
import repeatSvg from 'assets/repeat.svg';
import sleepingKoalaSvg from 'assets/sleeping-koala.svg';
import dataScientistSvg from 'assets/img_data-scientist.svg';
import sleepTherapistSvg from 'assets/img_sleep-therapist.svg';
import sleepJournalSvg from 'assets/img_diary.svg';
import yellowBackground from 'assets/yellow-background.png';
import pinkBackground from 'assets/pink-background.png';
import dashboardBreakdown from 'assets/dashboard-breakdown.png';
import shapesEmojisPattern from 'assets/shapes-emojis-pattern.png';
import illusAnalyzeSvg from 'assets/illus-analyze.svg';
import illusTrackingSvg from 'assets/illus-tracking.svg';
import illusCycle from 'assets/illus-cycle.svg';
import step1Svg from 'assets/step-1.svg';
import step2Svg from 'assets/step-2.svg';
import step3Svg from 'assets/step-3.svg';
import howWorks1 from 'assets/img_01_how-it-works.svg';
import howWorks2 from 'assets/img_02_how-it-works.svg';
import howWorks3 from 'assets/img_03_how-it-works.svg';
import howWorks4 from 'assets/img_04_how-it-works.svg';
import useMedium from 'hooks/useMedium';
import { SleepingCatIcon } from 'components/common/Icons';
import HypnosButton from 'components/common/Button';
import CtaButton from 'components/common/CtaButton';
import ActiveBackground from 'components/common/ActiveBackground';
import styles from './Home.module.css';
import insights1Svg from 'assets/home/01_insight.svg';
import insights2Svg from 'assets/home/02_insight.svg';
import insights3Svg from 'assets/home/03_insight.svg';
import sleepWakeTimeSvg from 'assets/home/img_sleep-wake-time.svg';
import moodTagsSvg from 'assets/home/img_mood-tags.svg';
import idealSleepSvg from 'assets/home/img_ideal-sleep.svg';

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    backgroundImage: `url(${repeatSvg})`,
    backgroundSize: 'cover',
  },
  heroText: {
    color: COLORS.WHITE,
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: COLORS.DARK_GRAY,
  },
  comboImages: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
  },
  triImages2: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: `${theme.spacing(5)}px`,
    width: '100%',
    maxHeight: '200px',
  },
  fullYellowBg: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    backgroundImage: `url(${yellowBackground})`,
    backgroundSize: 'cover',
  },
  pinkBackground: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    backgroundImage: `url(${pinkBackground})`,
    backgroundSize: 'cover',
  },
  patternBackground: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    backgroundImage: `url(${shapesEmojisPattern})`,
    backgroundSize: 'repeat',
  },
  stepsTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  stepImg: {
    paddingRight: `${theme.spacing(2)}px`,
  },
  dashboardImgDesktop: {
    width: '80%',
  },
  dashboardImgMobile: {
    width: '100%',
  },
  animalIcon: {
    maxWidth: '85%',
  },
  animalIconSmall: {
    maxWidth: '70%',
  },
  marginTop: {
    marginTop: `${theme.spacing(4)}px`,
  },
  CtaButtonText: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  heroBackground: {
    background: COLORS.WHITE,
  },
  fullPageHeight: {
    minHeight: '100vh',
  },
  partialPageHeight: {
    minHeight: '80vh',
  },
  halfHorizontalPage: {
    minWidth: '50vw',
  },
  peachBackground: {
    background: COLORS.PEACH,
  },
  textBottomPadding: {
    paddingBottom: theme.spacing(2),
  },
  countNumber: {
    color: COLORS.RED,
    paddingBottom: theme.spacing(1),
  },
  stepsImg: {
    paddingBottom: theme.spacing(7),
  },
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
}));

const Home = () => {
  const classes = useStyles();
  const { isMedium } = useMedium();

  return (
    <Box width="100vw">
      <Helmet>
        <title>Hypnos - Sleep Journal</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use sleep data from sleep trackers to correlate how different sleep habits affect your sleep. Discover which sleep trial best improves your sleep and overall happiness."
        />
      </Helmet>
      {/* Hero */}
      <Box display="flex" width="100vw" className={clsx(classes.fullPageHeight, classes.heroBackground)}>
        <Box className={classes.halfHorizontalPage} pl={5} display="flex" flexDirection="column" justifyContent="center">
          <Box maxWidth={560}>
            <div>
              <Typography variant="overline">
                A sleep journal
              </Typography>
              <Typography variant="overline">
                that helps you get
              </Typography>
              <Typography variant="overline">
                better sleep.
              </Typography>
            </div>
            <Box mt={3}>
              <Typography variant="subtitle1" style={{ maxWidth: 'inherit', color: COLORS.BLACK }}>
                What matters most for a majority of people when it comes to sleep is their daily habits and activities. Hypnos helps extend beyond your average sleep tracker with useful, actionable insights
              </Typography>
            </Box>
            <Box mt={6} display="flex">
              <a className={styles.navLink} href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                <CtaButton text="Support Our Kickstarter" />
              </a>
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.halfHorizontalPage, classes.peachBackground)}>
          <ActiveBackground background={COLORS.DARK_PEACH} translateX={-599} translateY={-100} />
        </Box>
      </Box>
      {/* How it works */}
      <Box display="flex" flexDirection="column" width="100vw" className={clsx(classes.heroBackground)}>
        <Box pt={5} pb={4} pl={5}>
          <Typography variant="overline">
            How it Works
          </Typography>
        </Box>
        <Grid container alignItems="stretch">
          <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
            <Box height="100%" width="100%" p={5} pt={10} style={{ background: COLORS.PINK }} display="flex" justifyContent="flex-end" flexDirection="column">
              <div>
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
            <Box height="100%" width="100%" p={5} pt={10} display="flex" style={{ background: COLORS.PEACH_1 }} justifyContent="flex-end" flexDirection="column">
              <div>
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
            <Box height="100%" width="100%" p={5} pt={10} display="flex" style={{ background: COLORS.PEACH_3 }} justifyContent="flex-end" flexDirection="column">
              <div>
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
            <Box height="100%" width="100%" p={5} pt={10} display="flex" style={{ background: COLORS.PEACH_2 }} justifyContent="flex-end" flexDirection="column">
              <div>
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

      {/* Supporting image combo */}
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
      <Box p={6} pb={14} width="100%" className={classes.grayBackground}>
        <Box width="100%">
          <Typography variant="overline">
            One place for
          </Typography>
          <Typography variant="overline">
            everything sleep
          </Typography>
        </Box>
        <Box mt={8}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" alignItems="start">
                <img src={insights1Svg} alt="First Sleep Insight" style={{ maxWidth: '100%' }} />
                <img src={insights2Svg} alt="Second Sleep Insight" className={clsx(classes.insightImage, { [classes.translate1]: !isMedium })} />
                <img src={insights3Svg} alt="Third Sleep Insight" className={clsx(classes.insightImage, { [classes.translate2]: !isMedium })} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <Box maxWidth={480} >
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
        <Box mt={16}>
          <Grid container spacing={6}>
            <Grid item sm={6}>
              <Box maxWidth={400}>
                <Typography variant="h1" gutterBottom>
                  Get better at waking up and getting to bed on time.
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  We track when you wake up and fall asleep so we can help guide you to reaching your goals.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <img src={sleepWakeTimeSvg} alt="Sleep-Wake Time Module" style={{ maxWidth: '100%', transform: 'translate(0, -40px)' }} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={16}>
          <Grid container spacing={6}>
            <Grid item sm={6}>
              <img src={moodTagsSvg} alt="Mood-Tags Module" style={{ maxWidth: '100%', transform: 'translate(0, -100px)' }} />
            </Grid>
            <Grid item sm={6}>
              <Box maxWidth={440}>
                <Typography variant="h1" gutterBottom>
                  Understand what makes you happy and improve your sleep
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  Our daily activities and routines can have significant impact on our sleep and our moods. We’ll help you discover which work and which don’t!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={16}>
          <Grid container spacing={10}>
            <Grid item sm={6}>
              <Box maxWidth={480}>
                <Typography variant="h1" gutterBottom>
                  Find out what your ideal amount of sleep is
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  We’ve all heard 8 hours of sleep is best, but depending on who you are that might be different. We’ll hone in on your optimal sleep time.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <img src={idealSleepSvg} alt="Ideal sleep module" style={{ maxWidth: '100%' }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box width="100%" py={12} px={4} className={classes.pinkBackground} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="overline" align="center" style={{ fontSize: '48px', maxWidth: 1120 }}>
          Sleep is important and it’s very personal. We want to make sure people find what works best for them – help us help everyone get better sleep.
        </Typography>
        <Box mt={6} display="flex">
          <a className={styles.navLink} href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
            <CtaButton text="Support Our Kickstarter" />
          </a>
        </Box>
      </Box>

    </Box>
  );
};

export default Home;

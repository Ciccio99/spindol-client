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
import dataScientistSvg from 'assets/data-scientist.svg';
import sleepTherapistSvg from 'assets/sleep-therapist.svg';
import sleepJournalSvg from 'assets/sleep-journal.svg';
import yellowBackground from 'assets/yellow-background.png';
import pinkBackground from 'assets/pink-background.png';
import dashboardBreakdown from 'assets/dashboard-breakdown.png';
import illusAnalyzeSvg from 'assets/illus-analyze.svg';
import illusTrackingSvg from 'assets/illus-tracking.svg';
import illusCycle from 'assets/illus-cycle.svg';
import step1Svg from 'assets/step-1.svg';
import step2Svg from 'assets/step-2.svg';
import step3Svg from 'assets/step-3.svg';
import useMedium from 'hooks/useMedium';
import { SleepingCatIcon } from 'components/common/Icons';
import HypnosButton from 'components/common/Button';
import CtaButton from 'components/common/CtaButton';
import styles from './Home.module.css';

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
    maxWidth: '250px',
  },
  marginTop: {
    marginTop: `${theme.spacing(4)}px`,
  },
  CtaButtonText: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { isMedium } = useMedium();

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Hypnos - Sleep Journal</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use sleep data from sleep trackers to correlate how different sleep habits affect your sleep. Discover which sleep trial best improves your sleep and overall happiness."
        />
      </Helmet>
      <div className={classes.heroContainer}>
        <Container>
          <Section>
            <Box py={4}>
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box mb={4} overflow="visible">
                    <Typography className={classes.heroText} variant="overline">
                      Discover
                    </Typography>
                    <Typography className={classes.heroText} variant="overline">
                      which habits
                    </Typography>
                    <Typography className={classes.heroText} variant="overline">
                      impact your sleep
                    </Typography>
                  </Box>
                  <Box mt={4}>
                    <Typography variant="subtitle1" className={classes.heroSubtitle}>
                      For most people, what matters most when it comes to sleep is their daily habits and activities. This is where trackers and their apps fall short and where Hypnos comes in.
                    </Typography>
                  </Box>
                  <Box mt={6} display="flex" justifyContent={isMedium ? 'center' : 'start'}>
                    <a className={styles.navLink} href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                      <CtaButton text="Support us on Kickstarter" />
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box display="flex" justifyContent="center">
                    <img className={clsx(classes.animalIcon, { [classes.marginTop]: isMedium })} alt="sleeping koala" width="85%" height="85%" src={sleepingKoalaSvg} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Section>
        </Container>
      </div>
      <Section>
        <Box p={4} pt={6}>
          <Box pb={8} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h1" align="center" display="inline">
              Hypnos is like having a Data Scientist,
            </Typography>
            <Typography variant="h1" align="center" display="inline">
              Sleep Therapist, and Diary all in one.
            </Typography>
          </Box>
          <Grid container justify="center" alignContent="center" spacing={8}>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.comboImages}>
                <img alt="Data Scientist" height={200} src={dataScientistSvg} />
              </div>
              <Typography variant="subtitle1" align="center">Data Scientist</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.comboImages}>
                <img alt="Sleep Therapist" height={200} src={sleepTherapistSvg} />
              </div>
              <Typography variant="subtitle1" align="center">Sleep Therapist</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.comboImages}>
                <img alt="Sleep Journal" height={200} src={sleepJournalSvg} />
              </div>
              <Typography variant="subtitle1" align="center">Sleep Diary</Typography>
            </Grid>
          </Grid>
        </Box>
      </Section>
      <div className={classes.fullYellowBg}>
        <Section>
          <Box p={4} pt={6}>
            <Box pb={4}>
              <Typography variant="h1" align="center">
                Finally, one place for everything sleep.
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" pt={4}>
              <img className={clsx(classes.dashboardImgDesktop, { [classes.dashboardImgMobile]: isMedium })} alt="Hypnos Dashboard Overview Notes" src={dashboardBreakdown} height="100%" />
            </Box>
          </Box>
        </Section>
      </div>
      <Section>
        <Box p={4} pt={6}>
          <Box pb={8} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h1" align="center" display="inline">
              How it works
            </Typography>
          </Box>
          <Grid container justify="center" alignContent="center" spacing={8}>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.triImages2}>
                <img alt="Tracking Data Illustration" width="100%" src={illusTrackingSvg} />
              </div>
              <div className={classes.stepsTextContainer}>
                <img className={classes.stepImg} alt="step 1" src={step1Svg} />
                <Typography variant="h2">We track your sleep nightly.</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.triImages2}>
                <img alt="Analyze Data Illustration" width="100%" src={illusAnalyzeSvg} />
              </div>
              <div className={classes.stepsTextContainer}>
                <img className={classes.stepImg} alt="step 2" src={step2Svg} />
                <div>
                  <Typography variant="h2">Then we analyze the</Typography>
                  <Typography variant="h2">data for you.</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.triImages2}>
                <img alt="Repeat Process Illustration" width="100%" src={illusCycle} />
              </div>
              <div className={classes.stepsTextContainer}>
                <img className={classes.stepImg} alt="step 3" src={step3Svg} />
                <Typography variant="h2">Finally, we provide you insights and repeat the process</Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Section>
      <div className={classes.pinkBackground}>
        <Section>
          <Box p={4} pt={6}>
            <Box pb={4}>
              <Typography variant="h1" align="center">
                Connect your favorite sleep tracker
              </Typography>
            </Box>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={5}>
                <Box display="flex" justifyContent="center">
                  <SleepingCatIcon size="70%" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box mt={4}>
                  <Typography variant="subtitle1" className={classes.heroSubtitle}>
                    There's already hundreds of trackers, and we don't need more! So we integrate with your favorite trackers to analyze your sleep.
                  </Typography>
                  <Box mt={2} display="flex">
                    <Box pr={4}>
                      <Typography variant="subtitle1" display="inline">
                        Supported Trackers:
                        <ul>
                          <li>Oura</li>
                          <li>Withings</li>
                        </ul>
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" display="inline">
                      Upcoming Trackers:
                      <ul>
                        <li>Fitbit</li>
                        <li>Whoop</li>
                        <li>Apple HealthKit</li>
                        <li>Google Fitness</li>
                      </ul>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Section>
      </div>
    </Container>
  );
};

export default Home;

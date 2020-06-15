import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
} from '@material-ui/core';
import Section from 'components/organizers/Section';
import sleepImg from 'assets/sleep-analysis.svg';
import sleepTrackerImg from 'assets/private-data.svg';
import styles from './Home.module.css';

const Home = () => (
  <Container maxWidth="lg">
    <Section>
      <Paper elevation={24}>
        <Box p={4}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} sm={6}>
              <Box mb={4}>
                <Typography variant="h3" display="inline" color="primary">
                  Discover which sleep habits
                </Typography>
                <Typography variant="h3" display="inline">
                  {' actually affect your sleep.'}
                </Typography>
              </Box>
              <Divider />
              <Box mt={4}>
                <Typography variant="h6" color="textSecondary">
                  A simple and better way to track your sleep habits and sleep quality.
                </Typography>
              </Box>
              <Box mt={4}>
                <a className={styles.navLink} href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" size="large" color="secondary">
                    <Typography variant="subtitle1">Request Beta Access</Typography>
                  </Button>
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <img alt="sleep analysis" width="100%" height="100%" src={sleepImg} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Section>
    <Section>
      <Paper elevation={24}>
        <Box p={4}>
          <Box mb={2}>
            <Typography variant="h5" align="center">
              Hypnos.ai helps you...
            </Typography>
          </Box>
          <Divider />
          <Box mt={4}>
            <Grid container spacing={4} justify="center">
              <Grid item sm={6} md={4}>
                <Typography variant="h6" gutterBottom>Commit to sleep habits</Typography>
                <Typography variant="subtitle1" color="textSecondary">Discover new methods to improve your sleep with our collection of science backed sleep trials. Track them on your personalized dashboard to see how you're progressing.</Typography>
              </Grid>
              <Grid item sm={6} md={4}>
                <Typography variant="h6" gutterBottom>Increase your sleep quality</Typography>
                <Typography variant="subtitle1" color="textSecondary">Correlate how your sleep habits affect your sleep quality. Receive reports on how your sleep habits impact your mood and sleep.</Typography>
              </Grid>
              <Grid item sm={6} md={4}>
                <Typography variant="h6" gutterBottom>Improve your quality of life</Typography>
                <Typography variant="subtitle1" color="textSecondary">Better sleep quality is linked with improved mood, productivity and overall quality of life.</Typography>
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Paper>
    </Section>
    <Section>
      <Paper elevation={24}>
        <Box p={4}>
          <Box mb={8} mt={4} display="flex" justifyContent="center">
            <Typography variant="h3" align="center">Feel energized, with better sleep habits</Typography>
          </Box>
          <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
            <iframe
              title="Hypnos.ai Demo Video"
              src="https://www.loom.com/embed/76f36e40f8f044068fc7456d650d82ab"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '25px',
              }}
            />
          </div>
        </Box>
      </Paper>
    </Section>
    <Section>
      <Paper elevation={24}>
        <Box p={4}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <img alt="sleep data" width="100%" height="100%" src={sleepTrackerImg} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="h5">
                  Connect your favorite sleep trackers
                </Typography>
              </Box>
              <Divider />
              <Box mt={4}>
                <Typography variant="subtitle1" gutterBottom display="block" color="textSecondary">
                  Combining data from your sleep tracker and your sleep habits, Hypnos.ai can reveal patterns in your sleep and help adjust your sleep routine.
                </Typography>
                <Typography variant="caption" gutterBottom display="block" color="textSecondary">
                  * Hypnos.ai is currently in beta, we will integrate additional sleep trackers over time.
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  Currently supported trackers:
                  <ul>
                    <li>Oura</li>
                  </ul>
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  Soon to be supported trackers:
                  <ul>
                    <li>Withings</li>
                    <li>Fitbit</li>
                    <li>Whoop</li>
                  </ul>
                  {'Don\'t see your favorite sleep tracker on this list? '}
                  <a href="https://sleepwell.typeform.com/to/zNgvJ7" data-mode="popup" data-submit-close-delay="0" target="_blank" rel="noopener noreferrer">
                    Leave us feedback
                  </a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Section>
    <Section>
      <Paper elevation={24}>
        <Box p={4}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Typography variant="h5" display="inline">Interested in joining the beta? </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <a className={styles.navLink} href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                <Button variant="contained" fullWidth size="large" color="primary">
                  <Typography variant="h6">Request Access</Typography>
                </Button>
              </a>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Section>
  </Container>
);

export default Home;

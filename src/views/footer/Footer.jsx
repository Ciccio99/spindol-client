import React from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import Copyright from 'components/copyright/Copyright';
import LinkText from 'components/linkText/LinkText';
import logo from 'assets/sleepwell-logo-transpbg.png';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Container maxWidth="lg">
      <Box mt={3} mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm="auto">
            <Box display="flex" alignItems="center">
              <img src={logo} alt="SleepWell Logo" height="45px" />
              <Typography variant="h6" display="inline">Hypnos.ai</Typography>
            </Box>
            <Box mt={1} p={1} pl={0}>
              <Copyright />
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box pt={1} display="flex" flexDirection="column">
              <Typography variant="body1">Legal</Typography>
              <LinkText to="/terms-of-service">Terms of Service</LinkText>
              <LinkText to="/privacy-policy">Privacy Policy</LinkText>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </footer>
);

export default React.memo(Footer);

import React from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import Copyright from 'components/copyright/Copyright';
import LinkText from 'components/linkText/LinkText';
import logo from 'assets/hypnos-logo-text-xs.png';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Container maxWidth="lg">
      <Box mt={8} mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box pt={1} display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <img src={logo} alt="SleepWell Logo" height="30px" />
              </Box>
              <Box py={1}>
                <LinkText to="https://twitter.com/hypnos_ai" external>Twitter</LinkText>
                <LinkText to="https://www.facebook.com/hypnosai/" external>Facebook</LinkText>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box pt={1} display="flex" flexDirection="column">
              <Typography variant="body1">Legal</Typography>
              <Box py={1}>
                <LinkText to="/terms-of-service">Terms of Service</LinkText>
              </Box>
              <Box py={1}>
                <LinkText to="/privacy-policy">Privacy Policy</LinkText>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box pt={1} display="flex" flexDirection="column">
              <Typography variant="body1">Resources</Typography>
              <Box py={1}>
                <LinkText to="https://community.hypnos.ai" external>Community</LinkText>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box py={4} display="flex" justifyContent="center">
        <Copyright />
      </Box>
    </Container>
  </footer>
);

export default React.memo(Footer);

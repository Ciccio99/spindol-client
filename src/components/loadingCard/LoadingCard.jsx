import React from 'react';
import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';
import styles from './LoadingCard.module.css';
import logo from '../../assets/sleepwell-logo-transpbg.png';

const LoadingCard = () => (
  <Container maxWidth="md">
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <img className={styles.pulse} width="150" src={logo} alt="Hypnos Logo" />
      <Box mt={6}>
        <Typography variant="h4" align="center">Loading...</Typography>
      </Box>
    </Box>
  </Container>
);

export default LoadingCard;

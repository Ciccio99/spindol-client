import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import awesomeFace from 'assets/emoticons/awesome-face.svg';
import styles from './LoadingCard.module.css';

const LoadingCard = () => (
  <Box display="flex" height="50vh" flexDirection="column" justifyContent="center" alignItems="center">
    <img className={styles.pulse} width="150" src={awesomeFace} alt="Hypnos Awesome Face" />
    <Box mt={6}>
      <Typography variant="h4" align="center">Loading...</Typography>
    </Box>
  </Box>
);

export default LoadingCard;

import React from 'react';
import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DragonIcon from 'assets/dragon.svg';

const NotFound = () => (
  <Container>
    <Box m={5} mt={8} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h3" align="center">Here Be Dragons!</Typography>
      <Typography variant="subtitle1">(404 - Not Found)</Typography>
      <Box p={3}>
        <img src={DragonIcon} width="300" alt="Dragon Logo" />
      </Box>
      <Box mt={3} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h6">
          {'Let\'s get you back '}
          <Link to="/dashboard">home</Link>
        </Typography>
      </Box>
    </Box>
  </Container>
);

export default NotFound;

import React from 'react';
import {
  Container,
  Box,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <Box m={5} mt={8} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant='h3'> 404 - Not Found</Typography>
        <Box mt={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Typography variant='h6' display='block'>It's okay, we all lose our way at some point.</Typography>
          <Typography variant='h6'>Let's get you back <Link to='/dashboard'>home</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;

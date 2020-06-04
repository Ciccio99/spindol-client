import React from 'react';
import {
  Box,
  Paper,
  Divider,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';

const CancelSTTModal = ({ trialTrackerName, handleConfirmClick, handleCloseClick }) => (
  <Box m={1} display="flex" justifyContent="center">
    <Paper elevation={24}>
      <Box px={4} py={3} maxWidth={600}>
        <Typography variant="h6">
          {`Are you sure you want to cancel the "${trialTrackerName}" sleep trial?`}
        </Typography>
      </Box>
      <Divider />
      <Box p={4}>
        <Grid container justify="space-around" spacing={4}>
          <Grid item xs={12} sm={5}>
            <Button onClick={handleCloseClick} color="primary" fullWidth variant="contained">{'No, Don\'t Cancel'}</Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button onClick={handleConfirmClick} color="secondary" fullWidth variant="contained">Yes, Cancel</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Box>
);

export default CancelSTTModal;

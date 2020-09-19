import React from 'react';
import {
  Modal, Box, Slide, Paper, Typography, Divider, Grid, Button,
} from '@material-ui/core';

const ConfirmRemoveGoalModal = ({
  goalTag, open, handleRemove, handleModalClose,
}) => (
  <Modal
    open={open}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    closeAfterTransition
    disableAutoFocus
    disableEnforceFocus
    disableRestoreFocus
  >
    <Slide direction="up" in={open}>
      <Box m={1} display="flex" justifyContent="center" maxWidth="600px" style={{ outline: 0 }}>
        <Paper>
          <Box p={4} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="subtitle1" align="center" gutterBottom>{`Are you sure you want to remove your "${goalTag.tag}" goal?`}</Typography>
            <Typography variant="caption" color="error" align="center">
              <strong>Removing this goal will NOT delete the associated tag. You're free to continue using the tag in your Daily Diary Check-In.</strong>
            </Typography>
            <Divider />
            <Box mt={4} width="100%">
              <Grid container justify="space-around" spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button onClick={handleModalClose} color="primary" fullWidth variant="contained">{'No, Don\'t Remove'}</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button onClick={handleRemove} color="secondary" fullWidth variant="contained">Yes, Remove</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

export default ConfirmRemoveGoalModal;

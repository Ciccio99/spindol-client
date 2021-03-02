import React from 'react';
import {
  Modal, Box, Slide, Paper, Typography, Divider, Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';

const useChipStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  sizeSmall: {
    fontSize: theme.typography.pxToRem(12),
    height: '18px',
  },
}));

const SleepGoalDetailsModal = ({
  sleepTrial, open, handleModalClose,
}) => {
  const { isMobile } = useMobile();
  const classes = useChipStyles();
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <Slide direction="up" in={open}>
        <Box m={1} display="flex" justifyContent="center" maxWidth="600px" style={{ outline: 0 }}>
          <Paper>
            <Box p={4} display="flex" flexDirection="column" alignItems="center" position="relative">
              <Box
                position="absolute"
                left="3%"
                top="2%"
                style={{ cursor: 'pointer' }}
                onClick={handleModalClose}
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle2" color="primary">
                  Close
                </Typography>
              </Box>
              <Typography variant="subtitle1" align="center" gutterBottom>{`${sleepTrial.name}`}</Typography>
              <Divider />
              <Box mt={4} width="100%">
                <Typography variant="subtitle1" color="primary" gutterBottom>{`${sleepTrial.type} Type`}</Typography>
                <Box mt={1} display="flex" alignItems="center" flexWrap="wrap">
                  {
                    sleepTrial.areasOfEffect.map((effect) => (
                      <Chip label={effect} key={effect} color="primary" variant="outlined" size="small" classes={isMobile ? classes : ({ root: classes.root })} />
                    ))
                  }
                </Box>
                <Typography variant="caption" color="textSecondary">Directions:</Typography>
                <Typography variant="body2" gutterBottom>{`${sleepTrial.directions} Type`}</Typography>
                <Typography variant="caption" color="textSecondary">Details:</Typography>
                <Typography variant="body2">{`${sleepTrial.description} Type`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </Modal>
  );
};
export default SleepGoalDetailsModal;

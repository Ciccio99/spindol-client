import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Modal,
  Slide,
  TextField,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import COLORS from 'constants/colors';

const ModalWrapper = ({ open, onModalClose, children }) => (
  <Modal
    open={open}
    onClose={onModalClose}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    closeAfterTransition
    disableAutoFocus
    disableEnforceFocus
    disableRestoreFocus
  >
    <Slide direction="up" in={open}>
      <Box
        display="flex"
        justifyContent="center"
        maxWidth="800px"
        width="100%"
        height="100%"
        style={{ outline: 0 }}
      >
        <Paper
          style={{
            backgroundColor: COLORS.BG_WHITE,
            minWidth: '100%',
            minHeight: '80vh',
            height: '100%',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

export default function EditMoodModal({ mood, date, onEditMood, open, onModalClose }) {
  return (
    <ModalWrapper open={open} onModalClose={onModalClose}>
    
    </ModalWrapper>
  );
}

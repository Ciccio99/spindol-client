import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  InputBase,
  IconButton,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';
import { CancelIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    background: COLORS.WHITE,
  },
  journalRoot: {
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: 32,
    fontWeight: theme.typography.h3.fontWeight,
    caretColor: COLORS.RED,
    margin: 'auto 0',
  },
  journalRootFontMobile: {
    fontSize: 24,
  },
  journalInput: {
    '&::placeholder': {
      color: COLORS.BLACK,
      opacity: 1,
    },
  },
  dateHeader: {
    color: COLORS.RED,
    marginBottom: `${theme.spacing(5)}px`,
  },
  cancelButton: {
    position: 'absolute',
    top: '3vw',
    right: '3vw',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.25s ease-in-out',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'transparent',
      filter: 'drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.1))',
    },
  },
  backdrop: {
    backgroundColor: 'transparent',
  },
}));

const JournalEditModal = ({
  isOpen, onClose, initText, header, onSave,
}) => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const [journalInput, setJournalInput] = useState(initText);

  useEffect(() => {
    setJournalInput(initText);
  }, [initText]);

  const handleOnJournalInput = (event) => {
    setJournalInput(event.target.value);
  };

  const onCloseHandle = () => {
    onSave(journalInput);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCloseHandle}
      hideBackdrop
      closeAfterTransition
    >
      <Fade in={isOpen} timeout={500}>
        <Box position="relative" className={classes.container} pt={11} px={2} width="100%" height="100%" display="flex" justifyContent="center">
          <IconButton
            className={classes.cancelButton}
            onClick={onCloseHandle}
            aria-label="Close and Save Journal"
            disableRipple
            disableFocusRipple
          >
            <CancelIcon size={48} />
          </IconButton>
          <Box display="flex" flexDirection="column" maxWidth={960} justifyContent="flex-start" alignItems="center" overflow="auto scroll" width="100%" height="100%">
            {
            header
              ? (
                <div style={{ width: '100%' }}>
                  <Typography variant="h4" className={classes.dateHeader}>{header}</Typography>
                </div>
              )
              : null
            }
            <Box overflow="auto scroll" width="100%" height="100%">
              <InputBase
                classes={{ root: classes.journalRoot, input: classes.journalInput }}
                className={clsx({ [classes.journalRootFontMobile]: isMobile })}
                multiline
                fullWidth
                placeholder="Last night, I dreamed..."
                value={journalInput}
                onChange={handleOnJournalInput}
                autoFocus
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JournalEditModal;

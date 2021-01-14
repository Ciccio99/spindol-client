import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMobile from 'hooks/useMobile';
import JournalEditModal from 'components/common/JournalEditModal';
import HypnosButton from 'components/common/Button';
import SecondaryButton from 'components/common/SecondaryButton';
import ShiftingPrompt from 'components/common/ShiftingPrompt';
import pencilSvg from 'assets/ic_pencil.svg';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  journalPreview: {
    height: 100,
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    transition: 'all 0.75s ease-in-out',
    position: 'relative',
  },
  pointerCursor: {
    cursor: 'pointer',
  },
  journalPreviewRead: {
    height: '60vh',
    maxHeight: '60vh',
    overflow: 'auto scroll',
  },
  readMore: {
    '&::after': {
      content: "''",
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, .9) 90%)',
      width: '100%',
      height: '1.5rem',
      transition: 'all 0.75s ease-in-out',
    },
  },
  dateHeader: {
    color: COLORS.RED,
    marginBottom: `${theme.spacing(2)}px`,
  },
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    width: 120,
  },
  fadeText: {
    animation: '$fadeText 4000ms ease-in-out infinite',
  },
  '@keyframes fadeText': {
    '0%': { opacity: 0 },
    '25%': { opacity: 1 },
    '75%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
}));

const JournalPreview = ({
  text, header, onSave, isEditable = false, clickToEditor = false,
}) => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const previewRef = React.useRef(null);
  const [readMode, setReadMode] = useState(false);
  const [journalOverflow, setJournalOverflow] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    if (previewRef.current) {
      const isOverflow = previewRef.current.offsetHeight < previewRef.current.scrollHeight;
      setJournalOverflow(isOverflow);
    }
  }, [text]);

  const closePreview = () => {
    setReadMode(false);
    if (previewRef.current !== null) {
      previewRef.current.scrollTop = 0;
    }
  };

  const openEditorHandle = () => {
    setReadMode(false);
    setIsEditorOpen(true);
  };

  const getReadButton = (isOpen) => (
    isOpen
      ? <HypnosButton text="Close" name="closeButton" onClick={closePreview} className={clsx(classes.button)} />
      : <HypnosButton text="Read" name="readButton" onClick={() => { setReadMode(true); }} className={clsx(classes.button, classes.buttonMarginRight)} />
  );
  return (
    <>
      <Box
        p={3}
        px={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <div>
          { header ? <Typography variant="h4" className={classes.dateHeader}>{header}</Typography> : null }
          <Box
            height="100%"
            ref={previewRef}
            onClick={clickToEditor ? openEditorHandle : null}
            className={clsx(classes.journalPreview, {
              [classes.journalPreviewRead]: readMode,
              [classes.readMore]: !readMode && journalOverflow,
              [classes.pointerCursor]: clickToEditor,
            })}
          >
            {
                text.length
                  ? (
                    <Typography variant="h3" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                      {text}
                    </Typography>
                  )
                  : (
                    <ShiftingPrompt variant="h3" />
                  )
              }

          </Box>
        </div>
        <Box pt={3} width="100%">
          <Grid container justify={isMobile ? 'space-between' : 'flex-end'} spacing={2}>
            {
            journalOverflow
              ? (
                <Grid item xs={6} sm="auto">
                  {getReadButton(readMode)}
                </Grid>
              )
              : null
          }

            {
            isEditable
              ? (
                <Grid item xs={6} sm="auto">
                  <SecondaryButton
                    onClick={openEditorHandle}
                    className={classes.button}
                    name="editButton"
                    text={(
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={pencilSvg} width={16} height={16} alt="pencil" style={{ marginRight: 8 }} />
                        {' '}
                        Edit
                      </div>
                    )}
                  />
                </Grid>
              )
              : null
            }
          </Grid>
        </Box>
      </Box>
      <JournalEditModal
        isOpen={isEditorOpen}
        onClose={() => { setIsEditorOpen(false); }}
        onSave={onSave}
        initText={text}
        header={header}
      />
    </>
  );
};

export default JournalPreview;

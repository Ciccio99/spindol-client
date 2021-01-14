import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import JournalEditModal from 'components/dailyDiary/JournalEditModal';
import HypnosButton from 'components/common/Button';
import SecondaryButton from 'components/common/SecondaryButton';
import pencilSvg from 'assets/ic_pencil.svg';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  journalPreview: {
    height: 175,
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    transition: 'all 0.75s ease-in-out',
    position: 'relative',
    // '&::after': {
    //   content: "''",
    //   position: 'absolute',
    //   zIndex: 1,
    //   bottom: 0,
    //   left: 0,
    //   pointerEvents: 'none',
    //   backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1) 90%)',
    //   width: '100%',
    //   height: '2rem',
    // },
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
      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, .9) 90%)',
      width: '100%',
      height: '1.5rem',
    },
  },
  dateHeader: {
    color: COLORS.RED,
    marginBottom: `${theme.spacing(2)}px`,
  },
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  buttonMarginRight: {
    marginRight: theme.spacing(4),
  },
}));

const JournalPreview = ({
  text, header, onSave, isEditable = false,
}) => {
  const classes = useStyles();
  const previewRef = React.useRef(null);
  const [readMode, setReadMode] = useState(false);
  const [journalOverflow, setJournalOverflow] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    if (previewRef.current) {
      const isOverflow = previewRef.current.offsetHeight < previewRef.current.scrollHeight;
      setJournalOverflow(isOverflow);
    }
  }, [previewRef.current, text]);

  const closePreview = () => {
    setReadMode(false);
    if (previewRef.current !== null) {
      previewRef.current.scrollTop = 0;
    }
  };

  const getReadButton = (isOpen) => (
    isOpen
      ? <HypnosButton text="Close" onClick={closePreview} className={clsx(classes.button, classes.buttonMarginRight)} />
      : <HypnosButton text="Read" onClick={() => { setReadMode(true); }} className={clsx(classes.button, classes.buttonMarginRight)} />
  );
  return (
    <>
      <Paper elevation={24}>
        <Box
          p={3}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <div>
            { header ? <Typography variant="h4" className={classes.dateHeader}>{header}</Typography> : null }
            <Box
              height="100%"
              ref={previewRef}
              className={clsx(classes.journalPreview, {
                [classes.journalPreviewRead]: readMode,
                [classes.readMore]: !readMode,
              })}
            >
              <Typography variant="h3" style={{ whiteSpace: 'pre-line' }}>
                {text}
              </Typography>
            </Box>
          </div>
          <Box pt={3} width="100%" display="flex" justifyContent="flex-end">
            {
              journalOverflow
                ? getReadButton(readMode)
                : null
            }
            {
              isEditable
                ? (
                  <SecondaryButton
                    onClick={() => { setIsEditorOpen(true); }}
                    className={classes.button}
                    text={(
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={pencilSvg} width={16} height={16} alt="pencil" style={{ marginRight: 8 }} />
                        {' '}
                        Edit
                      </div>
                    )}
                  />
                )
                : null
            }
          </Box>
        </Box>
      </Paper>
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

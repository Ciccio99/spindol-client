import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import { CancelIcon } from 'components/common/Icons';
import useDailyDiary from 'hooks/useDailyDiary';
import { updateDiaryJournal } from 'services/DailyDiaryServices';
import { useQueryCache, useMutation } from 'react-query';
import { useAlertSystemDispatch } from 'components/common/modals/node_modules/context/alertSystemContext';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  innerTopPadding: {
    height: '100%',
  },
  container: {
    position: 'absolute',
    left: 0,
    top: '48px',
    background: COLORS.WHITE,
    height: '15vh',
    maxHeight: '15vh',
    width: '100vw',
    zIndex: 1,
    transition: 'all 0.75s ease-in-out',
    overflow: 'hidden',
  },
  containerPlaceholder: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    background: COLORS.WHITE,
    height: '15vh',
  },
  containerFullPage: {
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'auto',
  },
  dateHeader: {
    color: COLORS.RED,
    marginBottom: `${theme.spacing(2)}px`,
  },
  loadingHeader: {
    color: COLORS.BLUE,
    marginBottom: `${theme.spacing(2)}px`,
  },
  journalRoot: {
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    caretColor: COLORS.RED,
  },
  journalInput: {
    '&::placeholder': {
      color: COLORS.BLACK,
      opacity: 1,
    },
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 32,
    transition: 'all 0.75s ease-in-out',
    cursor: 'pointer',
    visibility: 'hidden',
    opacity: 0,
    outline: 'none',
  },
  cancelButtonVisible: {
    visibility: 'visible',
    opacity: 1,
  },
}));

/*
  TODO: Remove scrolling from the close/preview mode journal module
*/

const todayDate = moment();
export default function JournalModule() {
  const classes = useStyles();
  const queryCache = useQueryCache();
  const { data, isLoading } = useDailyDiary(todayDate);
  const dispatchAlert = useAlertSystemDispatch();
  const [journalInput, setJournalInput] = useState('');
  const [journalFocus, setJournalFocus] = useState(false);
  const [journalExpanded, setJournalExpanded] = useState(false);
  const [enableMultiline, setEnableMultiline] = useState(false);

  const [saveJournalEntry] = useMutation(
    (journalEntry) => updateDiaryJournal(data._id, journalEntry),
    {
      onMutate: (value) => {
        const dateString = todayDate.format('YYYY-MM-DD');
        queryCache.cancelQueries(['dailyDiary', dateString]);
        const oldDiary = queryCache.getQueryData(['dailyDiary', dateString]);

        queryCache.setQueryData(['dailyDiary', dateString], (oldData) => ({
          ...oldData,
          journalEntry: value,
        }));

        return () =>
          queryCache.setQueryData(['dailyDiary', dateString], oldDiary);
      },
      onError: (error, values, rollback) => {
        dispatchAlert({
          type: 'ERROR',
          message: error.message,
        });
        if (rollback) {
          rollback();
        }
      },
    }
  );

  useEffect(() => {
    if (journalFocus && journalInput.length > 0) {
      setJournalExpanded(true);
      setEnableMultiline(true);
      document.body.style.overflow = 'hidden';
    } else if (!journalFocus) {
      setJournalExpanded(false);
      document.body.style.overflow = null;
    }
  }, [journalInput, journalFocus]);

  const handleOnJournalInput = (event) => {
    setJournalInput(event.target.value);
  };

  const handleCloseJournal = () => {
    saveJournalEntry(journalInput);
    setJournalFocus(false);
    setJournalExpanded(false);
    setTimeout(() => {
      setEnableMultiline(false);
    }, 750);
  };

  const handleOnKeyDown = (event) => {
    // console.log(event);
    if (event.keyCode === 27) {
      event.preventDefault();
      handleCloseJournal();
    }
  };

  return (
    <>
      <div
        className={clsx(classes.container, {
          [classes.containerFullPage]: journalExpanded,
        })}
      >
        <Container
          className={clsx({ [classes.innerTopPadding]: journalExpanded })}
        >
          <div
            className={clsx(classes.cancelButton, {
              [classes.cancelButtonVisible]: journalExpanded,
            })}
            onClick={handleCloseJournal}
            onKeyDown={handleOnKeyDown}
            role="button"
            tabIndex={0}
          >
            <CancelIcon size={48} />
          </div>
          <Box pt={5} pb={2} height="100%">
            <Typography
              variant="h4"
              className={classes.dateHeader}
              display="inline"
            >
              {todayDate.format('MMM DD, YYYY')}
            </Typography>
            {/* {
              isLoading
                ? <Typography variant="h4" className={classes.loadingHeader} display="inline">Loading...</Typography>
                : null
            } */}
            {isLoading ? (
              <LoadingInput />
            ) : (
              <InputBase
                classes={{
                  root: classes.journalRoot,
                  input: classes.journalInput,
                }}
                multiline
                rows={enableMultiline ? null : 1}
                fullWidth
                placeholder="Last night, I dreamed..."
                value={journalInput || data?.journalEntry || ''}
                onChange={handleOnJournalInput}
                onFocus={() => {
                  setJournalFocus(true);
                }}
                // onBlur={() => { console.log('losing focus')/*setJournalFocus(false);*/ }}
              />
            )}
          </Box>
        </Container>
      </div>
      <div className={classes.containerPlaceholder} />
    </>
  );
}

const LoadingInput = () => {
  const classes = useStyles();
  return (
    <InputBase
      classes={{ root: classes.journalRoot, input: classes.journalInput }}
      multiline
      fullWidth
      placeholder="Loading..."
      value=""
    />
  );
};

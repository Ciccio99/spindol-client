import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import useDailyDiary from 'hooks/useDailyDiary';
import { updateDiaryJournal } from 'services/DailyDiaryServices';
import { useQueryCache, useMutation } from 'react-query';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import JournalPreview from 'components/common/JournalPreview';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  background: {
    background: COLORS.WHITE,
    paddingTop: theme.spacing(2),
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
  }
}));

export default function Journal({ date = undefined }) {
  const classes = useStyles();
  const journalDate = moment(date);
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();
  const { data, isLoading } = useDailyDiary(journalDate);

  const [saveJournalEntry] = useMutation(
    (journalEntry) => updateDiaryJournal(data._id, journalEntry),
    {
      onMutate: (value) => {
        const dateString = journalDate.format('YYYY-MM-DD');
        queryCache.cancelQueries(['dailyDiary', dateString]);
        const oldDiary = queryCache.getQueryData(['dailyDiary', dateString]);

        queryCache.setQueryData(['dailyDiary', dateString], (oldData) => ({
          ...oldData,
          journalEntry: value,
        }));

        return () => queryCache.setQueryData(['dailyDiary', dateString], oldDiary);
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
    },
  );

  return (
    <div className={classes.background}>
      <Container>
        <JournalPreview
          text={isLoading ? 'Loading...' : (data?.journalEntry || '')}
          header={journalDate.format('MMM DD, YYYY')}
          onSave={saveJournalEntry}
          isEditable
          clickToEditor
        />
      </Container>
    </div>
  );
};

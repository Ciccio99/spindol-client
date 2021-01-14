import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import useDailyDiary from 'hooks/useDailyDiary';
import { updateDiaryJournal } from 'services/DailyDiaryServices';
import { useQueryCache, useMutation } from 'react-query';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import Section from 'components/organizers/Section';
import JournalPreview from 'components/dailyDiary/JournalPreview';

export default function Journal({ date = null }) {
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
    <Section>
      <JournalPreview
        text={isLoading ? 'Loading...' : (data?.journalEntry || '')}
        header={journalDate.format('MMM DD, YYYY')}
        isEditable
        onSave={saveJournalEntry}
      />
    </Section>
  );
};

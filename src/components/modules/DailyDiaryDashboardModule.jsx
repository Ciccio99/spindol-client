import React, { useState, useEffect } from 'react';
import { Box, Divider, LinearProgress, Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import { useAsync } from 'react-async';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import DailyDiaryServices from 'services/DailyDiaryServices';
import PanelModule from 'components/common/PanelModule';
import MoodSubModule from 'components/subModules/MoodSubModule';
import DayTagsSubModule from 'components/subModules/DayTagsSubModule';

const PanelWrapper = ({ date, children }) => (
  <PanelModule
    title="Daily Check-In"
    subtitle={moment(date || undefined).format('dddd DD, MMM YYYY')}
  >
    <Typography variant="subtitle2">
      (This will soon be replaced with a new check in experience)
    </Typography>
    {children}
  </PanelModule>
);

const DailyDiaryDashboardModule = ({ date, enableStreak, tagsDate }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const {
    data,
    error,
    isPending,
  } = useAsync(DailyDiaryServices.getDashboardData, { date });
  const {
    data: tagsData,
    error: tagsError,
    isPending: tagsIsPending,
    setData: setTagsData,
  } = useAsync(DailyDiaryServices.getDashboardData, { date: tagsDate || date });
  const [dailyDiary, setDailyDiary] = useState(null);

  const handleMoodUpdate = React.useCallback(
    async (dto) => {
      const oldData = dailyDiary;
      setDailyDiary({ ...oldData, ...dto });
      try {
        const { _id } = dailyDiary;
        const dd = await DailyDiaryServices.update({ _id, ...dto });
        setDailyDiary(dd);

        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Daily Diary Updated',
        });
      } catch (e) {
        setDailyDiary(oldData);
        dispatchAlertSystem({
          type: 'WARNING',
          message: e.message || 'Update failed: Something went wrong...',
        });
      }
    },
    [dailyDiary, setDailyDiary, dispatchAlertSystem]
  );

  const handleTagsUpdate = React.useCallback(
    async (tags) => {
      const dto = { diaryTags: tags.map((tag) => tag._id) };
      const oldData = tagsData;
      setTagsData({ ...oldData, diaryTags: tags });
      try {
        const { _id } = tagsData;
        const dd = await DailyDiaryServices.update({ _id, ...dto });
        setTagsData(dd);
        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Daily Diary Updated',
        });
      } catch (e) {
        setTagsData(oldData);
        dispatchAlertSystem({
          type: 'WARNING',
          message: e.message || 'Update failed: Something went wrong...',
        });
      }
    },
    [tagsData, setTagsData, dispatchAlertSystem]
  );

  useEffect(() => {
    let isMounted = true;
    if (data && isMounted) {
      setDailyDiary(data);
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  if (isPending || tagsIsPending) {
    return (
      <PanelWrapper date={date}>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }

  if (error || tagsError) {
    return (
      <PanelWrapper date={date}>
        {`${error.message || tagsError.message}`}
      </PanelWrapper>
    );
  }

  if (dailyDiary && tagsData) {
    return (
      <PanelWrapper date={date}>
        <Box mb={3}>
          <MoodSubModule
            date={date}
            mood={dailyDiary.mood}
            handleUpdate={handleMoodUpdate}
            enableStreak={enableStreak}
          />
        </Box>
        <Divider />
        <Box mt={3} mb={1}>
          <DayTagsSubModule
            date={tagsData.date}
            tags={tagsData.diaryTags || []}
            handleUpdate={handleTagsUpdate}
            enableVariedDateText={!!tagsDate}
          />
        </Box>
      </PanelWrapper>
    );
  }

  return <PanelWrapper date={date} />;
};

DailyDiaryDashboardModule.defaultProps = {
  enableStreak: false,
};

export default DailyDiaryDashboardModule;

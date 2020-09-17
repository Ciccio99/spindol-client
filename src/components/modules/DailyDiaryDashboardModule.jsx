import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  LinearProgress,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { useAsync } from 'react-async';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import DailyDiaryServices from 'services/DailyDiaryServices';
import PanelModule from 'components/organizers/PanelModule';
import MoodSubModule from 'components/subModules/MoodSubModule';
import DayTagsSubModule from 'components/subModules/DayTagsSubModule';
import { useSessionProgressState, useSessionProgressDispatch, updateSessionProgress } from 'context/sessionProgressContext';

const PanelWrapper = ({ date, children }) => (
  <PanelModule
    title="Daily Diary Check-In"
    subtitle={moment(date || undefined).format('dddd DD, MMM YYYY')}
  >
    {children}
  </PanelModule>
);

const DailyDiaryDashboardModule = ({ date, enableStreak, tagsDate }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const dispatchSessionProgress = useSessionProgressDispatch();
  const sessionProgressState = useSessionProgressState();
  const { data, error, isPending } = useAsync(DailyDiaryServices.getDashboardData, { date });
  const {
    data: tagsData, error: tagsError, isPending: tagsIsPending, setData: setTagsData,
  } = useAsync(
    DailyDiaryServices.getDashboardData, { date: tagsDate || date },
  );
  const [dailyDiary, setDailyDiary] = useState(null);

  useEffect(() => {
    if (dailyDiary?.mood) {
      dispatchSessionProgress({ type: 'MOOD_COMPLETE'});
    }
  }, [dailyDiary]);

  useEffect(() => {
    (async () => {
      if (tagsData?.diaryTags?.length) {
        dispatchSessionProgress({ type: 'TAGS_COMPLETE'});
      }
    })();

  }, [tagsData]);

  const handleMoodUpdate = React.useCallback(async (dto) => {
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
  }, [dailyDiary, setDailyDiary, dispatchAlertSystem]);

  const handleTagsUpdate = React.useCallback(async (tags) => {
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
  }, [tagsData, dispatchAlertSystem]);

  // const handleGoalComplete = async (goalTag) => {
  //   console.log('Completed: ', goalTag);
  //   const updatedTags = tagsData.diaryTags.concat(goalTag);
  //   const dto = { diaryTags: updatedTags.map((tag) => tag._id) };
  //   const oldData = tagsData;
  //   setTagsData({ ...oldData, diaryTags: updatedTags });
  //   try {
  //     const { _id } = tagsData;
  //     const dd = await DailyDiaryServices.update({ _id, ...dto });
  //     setTagsData(dd);
  //     dispatchAlertSystem({
  //       type: 'SUCCESS',
  //       message: 'Daily Diary Updated',
  //     });
  //   } catch (e) {
  //     setTagsData(oldData);
  //     dispatchAlertSystem({
  //       type: 'WARNING',
  //       message: e.message || 'Update failed: Something went wrong...',
  //     });
  //   }
  // };

  // const handleGoalIncomplete = async (goalTag) => {
  //   console.log('Incompleted: ', goalTag);
  //   const updatedTags = tagsData.diaryTags.filter((tag) => tag._id !== goalTag._id);
  //   const dto = { diaryTags: updatedTags.map((tag) => tag._id) };
  //   const oldData = tagsData;
  //   setTagsData({ ...oldData, diaryTags: updatedTags });
  //   try {
  //     const { _id } = tagsData;
  //     const dd = await DailyDiaryServices.update({ _id, ...dto });
  //     setTagsData(dd);
  //     dispatchAlertSystem({
  //       type: 'SUCCESS',
  //       message: 'Daily Diary Updated',
  //     });
  //   } catch (e) {
  //     setTagsData(oldData);
  //     dispatchAlertSystem({
  //       type: 'WARNING',
  //       message: e.message || 'Update failed: Something went wrong...',
  //     });
  //   }
  // };

  useEffect(() => {
    let isMounted = true;
    if (data && isMounted) {
      setDailyDiary(data);
    }

    return () => { isMounted = false; };
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
          <MoodSubModule date={date} mood={dailyDiary.mood} handleUpdate={handleMoodUpdate} enableStreak={enableStreak} />
        </Box>
        <Divider />
        <Box mt={3} mb={1}>
          <DayTagsSubModule date={tagsData.date} tags={tagsData.diaryTags || []} handleUpdate={handleTagsUpdate} enableVariedDateText={(!!tagsDate)} />
        </Box>
      </PanelWrapper>
    );
  }

  return null;
};

DailyDiaryDashboardModule.defaultProps = {
  enableStreak: false,
};

export default DailyDiaryDashboardModule;

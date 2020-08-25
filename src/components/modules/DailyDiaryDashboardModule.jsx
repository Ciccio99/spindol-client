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

const PanelWrapper = ({ date, children }) => (
  <PanelModule
    title="Daily Diary Check-In"
    subtitle={moment(date || undefined).format('dddd DD, MMM YYYY')}
  >
    {children}
  </PanelModule>
);

const DailyDiaryDashboardModule = ({ date, enableStreak }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const { data, error, isPending } = useAsync(DailyDiaryServices.getDashboardData, { date });
  const [dailyDiary, setDailyDiary] = useState(null);

  const handleUpdate = React.useCallback(async (dto) => {
    try {
      const { _id } = dailyDiary;
      const dd = await DailyDiaryServices.update({ _id, ...dto });
      setDailyDiary(dd);
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Daily Diary Updated',
      });
    } catch (e) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: e.message || 'Update failed: Something went wrong...',
      });
    }
  }, [dailyDiary, setDailyDiary, dispatchAlertSystem]);

  useEffect(() => {
    let isMounted = true;
    if (data && isMounted) {
      setDailyDiary(data);
    }

    return () => { isMounted = false; };
  }, [data]);

  if (isPending) {
    return (
      <PanelWrapper date={date}>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }

  if (error) {
    return (
      <PanelWrapper date={date}>
        {`${error.message}`}
      </PanelWrapper>
    );
  }

  if (dailyDiary) {
    return (
      <PanelWrapper date={date}>
        <Box mb={4}>
          <MoodSubModule mood={dailyDiary.mood} handleUpdate={handleUpdate} enableStreak={enableStreak} />
        </Box>
        <Divider />
        <Box mt={4}>
          <DayTagsSubModule date={date} tags={dailyDiary.diaryTags || []} handleUpdate={handleUpdate} />
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

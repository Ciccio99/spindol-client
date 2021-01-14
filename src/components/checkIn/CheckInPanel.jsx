import React, { useState, useEffect } from 'react';
import useTodayDiary from 'hooks/useTodayDiary';
import { useMutation } from 'react-query';
import useStep from 'hooks/useStep';
import MoodPanel from 'components/checkIn/MoodPanel';
import ActivitiesPanel from 'components/checkIn/ActivitiesPanel';
import useUserActivitiesObject from 'hooks/useUserActivitiesObject';

const steps = [
  { id: 'mood' },
  { id: 'activities' },
];

const CheckInPanel = () => {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;
  const { data: diaryData, isLoading: isDiaryLoading } = useTodayDiary();
  const { data: userActivities, isLoading: isActivitiesLoading } = useUserActivitiesObject();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isDiaryLoading) {
      setData(diaryData || data);
    }
  }, [diaryData]);

  const [saveDailyDiary] = useMutation((newData) => {});

  if (isDiaryLoading || isActivitiesLoading) {
    return '...loading';
  }

  const props = { initData: diaryData, setData, navigation };

  switch (id) {
    case 'mood':
      return <MoodPanel {...props}/>;
    case 'activities':
      return <ActivitiesPanel {...props} userActivities={userActivities} />;
    default:
      return null;
  }
};

export default CheckInPanel;

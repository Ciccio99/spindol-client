import React from 'react';
import { useDailyDiaryPrefetch } from 'hooks/useDailyDiary';
import { useActivitiesObjectPrefetch } from 'hooks/useActivities';
import { useSleepTrialsPrefetch } from 'hooks/useSleepTrials';
import useStep from 'hooks/useStep';
import useMobile from 'hooks/useMobile';
import MoodPanel from 'components/checkIn/MoodPanel';
import ActivitiesPanel from 'components/checkIn/ActivitiesPanel';
import moment from 'moment-timezone';
import { updateIntercom } from 'next-intercom';

const steps = [{ id: 'mood' }, { id: 'activities' }];

const CheckInPanel = () => {
  const { isMobile } = useMobile();
  const dateString = moment().format('YYYY-MM-DD');
  const dateStringYesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  if (isMobile) {
    updateIntercom(undefined, { hide_default_launcher: true });
  } else {
    updateIntercom(undefined, { hide_default_launcher: false });
  }

  useDailyDiaryPrefetch(dateString);
  useDailyDiaryPrefetch(dateStringYesterday);
  useActivitiesObjectPrefetch();
  useSleepTrialsPrefetch();

  switch (id) {
    case 'mood':
      return <MoodPanel navigation={navigation} date={dateString} />;
    case 'activities':
      return (
        <ActivitiesPanel navigation={navigation} date={dateStringYesterday} />
      );
    default:
      return null;
  }
};

export default CheckInPanel;

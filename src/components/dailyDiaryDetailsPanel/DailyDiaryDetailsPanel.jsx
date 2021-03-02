import React, { useState, useEffect } from 'react';
import {
  LinearProgress,
} from '@material-ui/core';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import DailyDiaryServices from 'services/DailyDiaryServices';
import Section from 'components/common/Section';
import SleepComparisonModule from 'components/modules/SleepComparisonModule';
import DailyDiaryDashboardModule from 'components/modules/DailyDiaryDashboardModule';
import Journal from 'components/dailyDiary/Journal';

const DailyDiaryDetailsPanel = ({ selectedDate }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [dailyDiary, setDailyDiary] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);
      const dd = await DailyDiaryServices.getByDate(selectedDate);
      if (!dd) {
        dispatchAlertSystem({
          type: 'WARNING',
          message: 'No Daily Diary check-ins available yet.',
        });
        setLoading(false);
        setDailyDiary();
        return;
      }
      if (!didCancel) {
        setDailyDiary(dd);
      }
      setLoading(false);
    })();
    return () => { didCancel = true; };
  }, [dispatchAlertSystem, selectedDate]);

  if (loading && !dailyDiary) {
    return <LinearProgress color="primary" />;
  }

  if (!dailyDiary) {
    return null;
  }

  if (loading && dailyDiary) {
    return (
      <>
        <LinearProgress color="primary" />
        <Section>
          <DailyDiaryDashboardModule date={selectedDate} />
        </Section>
        <Section>
          <SleepComparisonModule date={selectedDate} />
        </Section>
      </>
    );
  }

  return (
    <>
      <Journal date={selectedDate} />
      <Section>
        <DailyDiaryDashboardModule date={selectedDate} />
      </Section>
      <Section>
        <SleepComparisonModule date={selectedDate} />
      </Section>
    </>
  );
};

export default DailyDiaryDetailsPanel;

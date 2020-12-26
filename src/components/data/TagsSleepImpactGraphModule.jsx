import React, { useMemo } from 'react';
import {
  Box,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import moment from 'moment-timezone';
import PanelModule from 'components/organizers/PanelModule';
import SleepComparisonLineGraph from 'components/chart/SleepComparisonLineGraph';
import { getSleepHoursDuration } from 'services/SleepSummaryServices';

const TITLE = 'Tags Sleep Impact';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const getResults = async ({ series, baselineSeries, tag1, tag2 }) => {
  if (!series || !tag1 || !baselineSeries) {
    return undefined;
  }

  const data1 = [];
  const data2 = [];

  series.forEach((data, index) => {
    const nextData = series[index + 1];
    if (nextData) {
      const x = nextData.date;
      let y = nextData.sleep ? getSleepHoursDuration(nextData.sleep) : null;
      if (data?.diary?.diaryTags?.some((tag) => tag._id === tag1._id)) {
        data1.push({ x, y });
        data2.push({ x, y: null });
      } else {
        data1.push({ x, y: null });
        data2.push({ x, y });
      }
      // data1.push({ x, y });
    }
  });

  // if (tag2) {
  //   series.forEach((data, index) => {
  //     const nextData = series[index + 1];
  //     if (nextData) {
  //       const x = nextData.date;
  //       let y = null;
  //       if (data?.diary?.diaryTags?.some((tag) => tag._id === tag2._id)) {
  //         y = nextData.sleep ? getSleepHoursDuration(nextData.sleep) : null;
  //       }
  //       data2.push({ x, y });
  //     }
  //   });
  // } else {
  //    baselineSeries.forEach((data, index) => {
  //     const x = data.date;
  //     const y = data.sleep ? getSleepHoursDuration(data.sleep) : null;
  //     data2.push({ x, y });
  //   });
  // }

  console.log(data1, data2);

  return { data1, data2 };
};

const TagsSleepImpactGraphModule = ({ series, baselineSeries, tag1, tag2 }) => {
  const reqParams = useMemo(() => ({
    series,
    baselineSeries,
    tag1,
    tag2,
  }), [series, baselineSeries, tag1, tag2]);
  const { data, isPending, error } = useAsync(getResults, {
    watch: reqParams,
    ...reqParams,
  });

  if (error) {
    return (
      <PanelWrapper>
        <Typography variant="subtitle2" color="error">{error.message}</Typography>
      </PanelWrapper>
    );
  }

  if (!data && isPending) {
    return (
      <PanelWrapper>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }

  if (data) {
    return (
      <PanelWrapper>
        { (isPending && <LinearProgress color="secondary" />) || <div style={{ height: '4px' }} /> }
        <Box width="100%" height={400}>
          <SleepComparisonLineGraph data1={data.data1} data2={data.data2} />
        </Box>
      </PanelWrapper>
    );
  }

  return <PanelWrapper><Typography variant="subtitle1">Select a date range & tag to view your sleep graphs.</Typography></PanelWrapper>;
};


export default TagsSleepImpactGraphModule;

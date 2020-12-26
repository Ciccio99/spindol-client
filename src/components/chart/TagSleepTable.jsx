import React, { useMemo } from 'react';
import {
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import SleepSummaryServices from 'services/SleepSummaryServices';
import ComparisonTable from 'components/common/ComparisonTable';

const getTableData = async ({
  startDate, endDate, tag1, tag2,
}) => {
  if (!startDate || !endDate || !tag1) {
    return undefined;
  }
  const tag1Data = await SleepSummaryServices
    .getTagSleepTableData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), tag1);

  if (tag2) {
    const tag2Data = await SleepSummaryServices
      .getTagSleepTableData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), tag2);
    tag1Data.baselineStats = tag2Data.newStats;
    tag1Data.stats2Count = tag2Data.newStatsCount;
  }

  return tag1Data;
};

const TagSleepTable = ({
  startDate, endDate, tag1, tag2,
}) => {
  const reqParams = useMemo(() => ({
    startDate,
    endDate,
    tag1,
    tag2,
  }), [startDate, endDate, tag1, tag2]);
  const { data, isPending, error } = useAsync(getTableData, {
    watch: reqParams,
    ...reqParams,
  });

  if (!data && isPending) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {
    return <Typography variant="subtitle2" color="error">{error.message}</Typography>;
  }

  if (data) {
    return (
      <>
        {isPending && <div style={{ height: '4px' }}><LinearProgress color="secondary" /></div>}
        {!isPending && <div style={{ height: '4px' }} />}
        <ComparisonTable
          keys={data.keys}
          stats1={data.newStats}
          stats1Label={tag1.tag}
          stats1CountLabel={`(${data.newStatsCount} data point${data.newStatsCount === 1 ? '' : 's'})`}
          stats2={data.baselineStats}
          stats2Label={tag2 ? tag2.tag : undefined}
          stats2CountLabel={tag2 ? `(${data.stats2Count} data point${data.stats2Count === 1 ? '' : 's'})` : undefined}
        />
      </>
    );
  }

  return null;
};

export default TagSleepTable;

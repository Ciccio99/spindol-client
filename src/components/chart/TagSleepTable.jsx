import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import SleepSummaryServices from 'services/SleepSummaryServices';
import ComparisonTable from 'components/common/ComparisonTable';

// Load in Sleep data that have the tag
// Load in sleep data that dont have the tag
// Display comparison table between the two
// Check for missing data and display a message for each
// i.e. Not tag sleep, not baseline sleep (cus you performed the tag each day)
// What happens if you performed a tag every day for a month? WHere should the baseline data come from?
// Should it just be your current baseline or should we collect any  sleep data (even outside of the date ranges) to create the baseline?

const TagSleepTable = ({ startDate, endDate, tag }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate || !tag) {
      return;
    }
    setIsPending(true);
    (async () => {
      try {
        const newData = await SleepSummaryServices
          .getTagSleepTableData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), tag);
        setData(newData);
        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setIsPending(false);
      }
    })();
  }, [startDate, endDate, tag]);

  if (isPending) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {
    return <Box mt={4}><Typography>{error.message}</Typography></Box>;
  }

  if (data) {
    return (
      <ComparisonTable
        keys={data.keys}
        newStats={data.newStats}
        newLabel={`Tag Sleep (${data.newStatsCount} data point${data.newStatsCount === 1 ? '' : 's'})`}
        baselineStats={data.baselineStats}
      />
    );
  }

  return null;
};

export default TagSleepTable;

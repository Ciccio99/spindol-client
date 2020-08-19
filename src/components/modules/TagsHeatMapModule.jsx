import React, { useState, useEffect } from 'react';
import {
  LinearProgress,
  Typography,
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import DailyDiaryServices from 'services/DailyDiaryServices';
import TagsHeatMap from 'components/chart/TagsHeatMap';
import dateViews from 'constants/dateViews';
import useMobile from 'hooks/useMobile';

const TITLE = 'Tags Tracker';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const TagsHeatMapModule = ({ startDate, endDate, viewRange }) => {
  const { isMobile } = useMobile();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    setIsPending(true);
    (async () => {
      try {
        const newData = await DailyDiaryServices
          .getTagsHeatMapData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
        setData(newData);
        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setIsPending(false);
      }
    })();
  }, [startDate, endDate]);

  if (isPending) {
    return <PanelWrapper><LinearProgress color="secondary" /></PanelWrapper>;
  }

  if (error) {
    return <PanelWrapper><Typography>{error.message}</Typography></PanelWrapper>;
  }

  if (isMobile && viewRange !== dateViews.W) {
    return (
      <PanelWrapper>
        <Typography variant="body1">
          Toggle date range to 'Weekly' to view your Tag Tracker data.
        </Typography>
      </PanelWrapper>
    );
  }

  if (data) {
    return (
      <PanelWrapper>
        <TagsHeatMap data={data.data} keys={data.keys} />
      </PanelWrapper>
    );
  }
  return null;
};

export default TagsHeatMapModule;

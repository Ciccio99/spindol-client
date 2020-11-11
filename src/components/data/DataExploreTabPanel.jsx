import React, { useState, useEffect } from 'react';
import {
  Grid, LinearProgress, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useAsync } from 'react-async';
import moment from 'moment-timezone';
import dateViews from 'constants/dateViews';
import Section from 'components/organizers/Section';
import TagSleepDataModule from 'components/modules/TagSleepDataModule';
import DateRangePicker from 'views/DataView/DateRangePicker';
import TagComparisonSelectors from 'views/DataView/TagComparisonSelectors';
import { getAllDiaries } from 'services/DailyDiaryServices';
import { getAllSleep } from 'services/SleepSummaryServices';
import DateMap from 'utils/DateMap';
import TagInfoModule from 'components/data/TagInfoModule';
import TagCalendarModule from 'components/data/TagCalendarModule';
import useMobile from 'hooks/useMobile';
import rocketMoonSVG from 'assets/rocket-moon.svg';
import { getTagBaselineSeries } from 'utils/sleep';

const useStyles = makeStyles((theme) => ({
  bgImage: {
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    '&::before': {
      content: "''",
      backgroundImage: `url(${rocketMoonSVG})`,
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      opacity: 0.25,
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  },
}));

const TopPanel = ({
  handleDatesUpdate, handleRangeUpdate, handleTag1Change, handleTag2Change,
}) => (
  <Grid container spacing={2} justify="space-between" alignItems="center">
    <Grid item xs={12} sm="auto">
      <DateRangePicker handleDatesUpdate={handleDatesUpdate} handleRangeUpdate={handleRangeUpdate} />
    </Grid>
    <Grid item xs={12} sm="auto">
      <TagComparisonSelectors handleTag1Change={handleTag1Change} handleTag2Change={handleTag2Change} />
    </Grid>
  </Grid>
);

const getData = async () => {
  const ddReq = getAllDiaries();
  const sleepReq = getAllSleep();
  const [diaries, sleeps] = await Promise.all([ddReq, sleepReq]);
  let start;
  let end = moment().utc().format('YYYY-MM-DD');
  if (diaries.length > 0 && sleeps.length > 0) {
    const dStart = moment(diaries[0].date);
    const sStart = moment(sleeps[0].date);
    start = dStart.diff(sStart) < 0 ? dStart : sStart;
  } else {
    throw new Error('Not enough data yet. Keep tagging your activities and using your sleep tracker and soon enough you will be able to see your activity/sleep metrics');
  }

  const dateMap = new DateMap(start, end);
  diaries.forEach((diary) => {
    dateMap.join(moment.utc(diary.date).format('YYYY-MM-DD'), { diary });
  });
  sleeps.forEach((sleep) => {
    dateMap.join(moment.utc(sleep.date).format('YYYY-MM-DD'), { sleep });
  });

  return {
    diaries,
    sleepSummaries: sleeps,
    dateMap,
  };
};

const DataExploreTabPanel = () => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const [viewRange, setViewRange] = useState(dateViews.M);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.M),
    endDate: moment().endOf(dateViews.M),
    month: moment().format('MMMM'),
    year: moment().format('YYYY'),
  });
  const [selectedTag1, setSelectedTag1] = useState();
  const [selectedTag2, setSelectedTag2] = useState();
  const { data, isPending, error } = useAsync(getData);
  const [prunedData, setPrunedData] = useState(undefined);

  // Prune data based on the date view range
  useEffect(() => {
    if (!data?.dateMap || !selectedTag1) {
      return;
    }
    const series = data.dateMap.getRange(
      viewDates.startDate.format('YYYY-MM-DD'),
      viewDates.endDate.format('YYYY-MM-DD'),
    );

    let baselineSeries = getTagBaselineSeries(series, selectedTag1);

    if (series && baselineSeries) {
      setPrunedData({ series, baselineSeries });
    }
  }, [data, viewDates, viewRange, selectedTag1]);

  if (error) {
    return (
      <>
        <TopPanel handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} handleTag1Change={setSelectedTag1} handleTag2Change={setSelectedTag2} />
        <Section>
          <Typography variant="subtitle2" color="error">{error.message}</Typography>
        </Section>
      </>
    );
  }

  if (!data && isPending) {
    return (
      <>
        <TopPanel handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} handleTag1Change={setSelectedTag1} handleTag2Change={setSelectedTag2} />
        <Section>
          <LinearProgress color="secondary" />
        </Section>
      </>
    );
  }

  if (data && prunedData?.series && prunedData?.baselineSeries && selectedTag1) {
    return (
      <>
        <TopPanel handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} handleTag1Change={setSelectedTag1} handleTag2Change={setSelectedTag2} />
        {
          (isPending && <LinearProgress color="secondary" />) || <div style={{ height: '4px' }} />
        }
        <Section>
          <TagSleepDataModule startDate={viewDates.startDate} endDate={viewDates.endDate} tag1={selectedTag1} tag2={selectedTag2} />
        </Section>
        {
          (selectedTag1 || selectedTag2)
          && (
            <Section>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  {selectedTag1 && <TagInfoModule series={prunedData.series} tag={selectedTag1}/>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {selectedTag2 && <TagInfoModule series={prunedData.series} tag={selectedTag2}/>}
                </Grid>
              </Grid>
            </Section>
          )
        }
        {
          selectedTag1
          && !isMobile
          && (
            <Section>
              <TagCalendarModule series={data.dateMap.getAll()} tag={selectedTag1} />
            </Section>
          )
        }

        {
          selectedTag2
          && !isMobile
          && (
            <Section>
              <TagCalendarModule series={data.dateMap.getAll()} tag={selectedTag2} variant="secondary" />
            </Section>
          )
        }
      </>
    );
  }

  return (
    <>
      <TopPanel handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} handleTag1Change={setSelectedTag1} handleTag2Change={setSelectedTag2} />
      <Section>
        <div className={clsx(classes.bgImage)}>
          <Typography variant={isMobile ? 'subtitle1' : 'h6'}>Select a tag to view your data...</Typography>
        </div>
      </Section>
    </>
  );
};

export default DataExploreTabPanel;

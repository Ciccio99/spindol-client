import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useAsync } from 'react-async';
import { MOOD_VALUES, VALUES_MOOD, MOOD_COLOR, getMoodIcon } from 'constants/mood';
import PanelModule from 'components/organizers/PanelModule';
import MoodDoughnut from 'components/chart/MoodDoughnut';

const TITLE = 'Tags Mood Impact';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const getResults = async ({ series, baselineSeries, tag1, tag2 }) => {
  if (!series || !baselineSeries || !tag1) {
    return undefined;
  }

  const data1Diaries = [];
  let data1MoodSum = 0;
  let data1MoodCount = 0;
  const data2Diaries = [];
  let data2MoodSum = 0;
  let data2MoodCount = 0;

  series.forEach((data, index) => {
    const nextData = series[index + 1];
    if (nextData && nextData.diary) {
      const tag1Match = data.diary?.diaryTags?.some((tag) => tag._id === tag1._id);
      if (tag1Match) {
        data1Diaries.push(nextData.diary);
        if (nextData.diary.mood) {
          data1MoodSum += MOOD_VALUES[nextData.diary.mood];
          data1MoodCount += 1;
        }
      }
      if (tag2 && data?.diary?.diaryTags?.some((tag) => tag._id === tag2._id)) {
        data2Diaries.push(nextData.diary);
        if (nextData.diary.mood) {
          data2MoodSum += MOOD_VALUES[nextData.diary.mood];
          data2MoodCount += 1;
        }
      }
    }
  });

  if (!tag2) {
    baselineSeries.forEach((data, index) => {
      const nextData = baselineSeries[index + 1];
      if (nextData && nextData.diary) {
        const tag1Match = data?.diary?.diaryTags?.some((tag) => tag._id === tag1._id);
        if (!tag1Match) {
          data2Diaries.push(nextData.diary);
          if (nextData.diary.mood) {
            data2MoodSum += MOOD_VALUES[nextData.diary.mood];
            data2MoodCount += 1;
          }
        }
      }
    });
  }

  const data1MoodNum = Math.round(data1MoodSum / data1MoodCount);
  const data2MoodNum = Math.round(data2MoodSum / data2MoodCount);
  const data1Mood = data1MoodNum ? VALUES_MOOD[data1MoodNum] : undefined;
  const data2Mood = data2MoodNum ? VALUES_MOOD[data2MoodNum] : undefined;

  return {
    data1Diaries,
    data2Diaries,
    data1Mood,
    data2Mood,
  };
};

const TagsMoodImpactModule = ({ series, baselineSeries, tag1, tag2 }) => {
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
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={6} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>{tag1.tag}</Typography>
              {
                data.data1Mood
                && (
                  <>
                    <Typography variant="caption" color="textSecondary" gutterBottom>Avg Mood:</Typography>
                    <MoodBox mood={data.data1Mood} />
                  </>
                )
              }
              { data.data1Diaries.length === 0 &&
                <Typography variant="subtitle2" color="error">
                  {`No available data for "${tag1.tag}" tag`}
                </Typography>
              }
            </Grid>
            <Grid item xs={12} md={6}>
              {
                data.data1Diaries.length !== 0
                && <MoodDoughnut dailyDiaries={data.data1Diaries} />
              }
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={6} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="secondary" gutterBottom>{tag2?.tag || 'Baseline'}</Typography>
              {
                data.data2Mood
                && (
                  <>
                    <Typography variant="caption" color="textSecondary" gutterBottom>Avg Mood:</Typography>
                    <MoodBox mood={data.data2Mood} />
                  </>
                )
              }
              { data.data2Diaries.length === 0 &&
                <Typography variant="subtitle2" color="error">
                  {`No available data for "${tag2 ? `${tag2.tag} tag` : 'Baseline'}"`}
                </Typography>
              }
            </Grid>
            <Grid item xs={12} md={6}>
              {
                data.data2Diaries.length !== 0
                && <MoodDoughnut dailyDiaries={data.data2Diaries} />
              }
            </Grid>
          </Grid>
        </Grid>
      </PanelWrapper>
    );
  }

  return <PanelWrapper><Typography variant="subtitle1">Select a date range & tag to view your data.</Typography></PanelWrapper>;
};

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const useMoodStyles = makeStyles((theme) => ({
  box: {
    borderRadius: '5px',
    border: '1px',
    borderStyle: 'solid',
    maxWidth: '200px',
    marginBottom: theme.spacing(2),
  },
  text: {
    fontWeight: 800,
  },
  excellent: { color: MOOD_COLOR.excellent, borderColor: MOOD_COLOR.excellent},
  good: { color: MOOD_COLOR.good, borderColor: MOOD_COLOR.good },
  meh: { color: MOOD_COLOR.meh, borderColor: MOOD_COLOR.meh },
  bad: { color: MOOD_COLOR.bad, borderColor: MOOD_COLOR.bad },
  awful: { color: MOOD_COLOR.awful, borderColor: MOOD_COLOR.awful },
}));

const MoodBox = ({ mood }) => {
  const classes = useMoodStyles();
  const MoodIcon = getMoodIcon(mood);
  return (
    <Box px={2} py={1} display="flex" justifyContent="center" alignItems="center" minWidth={180} className={clsx(classes.box, classes[mood])}>
    <Box mr={2} display="flex" justifyContent="center" alignItems="center">
      <MoodIcon htmlColor={MOOD_COLOR[mood]} fontSize="large" />
    </Box>
    <Typography variant="h6" display="inline" align="center" className={clsx(classes.text, classes[mood])}>
      {capFirst(mood)}
    </Typography>
  </Box>
  );
};

export default TagsMoodImpactModule;

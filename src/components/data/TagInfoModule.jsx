import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import { MOOD_VALUES, VALUES_MOOD, MOOD_COLOR, getMoodIcon } from 'constants/mood';
import awesomeFace from 'assets/emoticons/awesome-face.svg';

const getTagInfo = (series, tag) => {
  let count = 0;
  let streak = 0;
  let highStreak = 0;
  let moodSum = 0;
  let moodCount = 0;
  let commonTags = {};
  series.forEach((data, index) => {
    const nextData = series[index + 1];
    const match = data?.diary?.diaryTags?.some((t) => t._id === tag._id);
    if (match) {
        count += 1;
        streak += 1;
        data.diary.diaryTags.forEach((t) => {
          if (t._id !== tag._id) {
            if (commonTags[t._id]) {
              commonTags[t._id].count += 1;
            } else {
              commonTags[t._id] = { tagName: t.tag, count: 1};
            }
          }
        });
        if (nextData?.diary?.mood) {
          moodSum += MOOD_VALUES[nextData.diary.mood];
          moodCount += 1;
        }
    } else {
      if (streak > highStreak) {
        highStreak = streak;
      }
      streak = 0;
    }
  });
  const moodNum = Math.round(moodSum / moodCount);
  const avgMood = moodNum ? VALUES_MOOD[moodNum] : undefined;
  commonTags = Object.values(commonTags)
    .sort((a, b) => a.count > b.count ? -1 : 1)
    .splice(0,5);

  return { count, streak: highStreak, commonTags, avgMood };
};

const TagInfoModule = ({ series, tag }) => {
  const tagInfo = useMemo(() => getTagInfo(series, tag), [series, tag]);
  const MoodIcon = getMoodIcon(tagInfo.avgMood);

  if (!tagInfo?.count) {
    return (
      <PanelModule title={tag.tag}>
        <Typography variant="subtitle2" color="error">
          {`No data available for "${tag.tag}" tag`}
        </Typography>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={tag.tag}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom>Count</Typography>
          <Typography variant="h6" align="center">{tagInfo.count}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom noWrap>Longest Streak</Typography>
          <Typography variant="h6" align="center">{tagInfo.streak}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom noWrap>Avg Mood</Typography>
          {/* <Typography variant="h6">{tagInfo.avgMood}</Typography> */}
          <Box display="flex" justifyContent="center">
            { MoodIcon && <MoodIcon size={35} /> }
          </Box>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>Associated Tags</Typography>
        { tagInfo.commonTags.map((tagValue, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" display="inline">{tagValue.tagName}</Typography>
            <Typography variant="subtitle1" display="inline">x{tagValue.count}</Typography>
          </Box>
        ))}
      </Box>
    </PanelModule>
  );
}

export default TagInfoModule;

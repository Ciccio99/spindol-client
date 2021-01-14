import React, { useState } from 'react';
import {
  Box, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import eatFaceSvg from 'assets/emoticons/illus_eat.svg';
import StepperButton from 'components/checkIn/StepperButton';
import moment from 'moment-timezone';

const useStyles = makeStyles(() => ({
  moodImg: {
    maxWidth: '28vw',
  },
  activityCard: {
    cursor: 'pointer',
    '&:hover': {
      background: COLORS.LIGHTEST_GRAY,
    },
  },
  selectedActivity: {
    background: COLORS.LIGHTEST_GRAY,
  },
  listContainer: {
    minWidth: 375,
    maxWidth: 375,
  },
  accentText: {
    color: COLORS.RED,
  },
}));

const markPreSelectedActivities = (activities, selectedActivities) => {
  const userActivities = activities;
  selectedActivities.forEach((activity) => {
    userActivities[activity._id].selected = true;
  });
  return userActivities;
};

const ActivitiesPanel = ({
  initData, setData, userActivities, navigation,
}) => {
  const classes = useStyles();
  const { previous } = navigation;
  const initActivities = markPreSelectedActivities(userActivities, initData.diaryTags);
  const [activities, setActivities] = useState(initActivities);
  const onSelectHandle = (activity) => {
    setActivities((prevData) => ({
      ...prevData,
      [activity._id]: {
        ...activity,
        selected: true,
      },
    }));
    setData((prevData) => ({
      ...prevData,
      diaryTags: [...prevData.diaryTags, activity._id],
    }));
  };

  const onRemoveHandle = (activity) => {
    setActivities((prevData) => ({
      ...prevData,
      [activity._id]: {
        ...activity,
        selected: false,
      },
    }));

    setData((prevData) => ({
      ...prevData,
      diaryTags: prevData.diaryTags.filter((element) => element._id !== activity._id),
    }));
  };


  /*
    Panel for all your tags
    Panel for seeing and adding suggested sleep tags
  */

  return (
    <>
      <Box width="100%" height="100vh" mt="-48px" pt="48px" pr={2} display="flex">
        <ActivitySidePanel
          activities={activities}
          onSelect={onSelectHandle}
          onRemove={onRemoveHandle}
          date={initData.date}
        />
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" p={2}>
          <img src={eatFaceSvg} alt="Eating Happy Face" className={classes.moodImg} width="100%" height="100%" />
        </Box>
      </Box>
      <StepperButton back onClick={previous} />
      <StepperButton />
    </>
  );
};

const ActivitySidePanel = ({
  activities, onSelect, onRemove, date,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={24}>
      <Box width="100%" pt={2} pb={2} px={2}>
        <Box maxWidth={200}>
          <Typography className={classes.accentText} variant="h4" gutterBottom>
            {moment(date).format('MMM DD')}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">Did you do any activities yesterday?</Typography>
        </Box>
      </Box>
      <Box height="100%" width={375} overflow="scroll">
        {
            Object.values(activities).map((activity) => (
              <ActivityCard
                activity={activity}
                isSelected={activity.selected}
                onClick={
                  activity.selected
                    ? () => { onRemove(activity); }
                    : () => { onSelect(activity); }
                }
              />
            ))
          }
      </Box>
    </Paper>
  );
};

const ActivityCard = ({ activity, onClick, isSelected = false }) => {
  const classes = useStyles();
  return (
    <Box
      px={2}
      minHeight={56}
      width="100%"
      display="flex"
      alignItems="center"
      onClick={onClick}
      className={clsx(classes.activityCard, { [classes.selectedActivity]: isSelected })}
    >
      {
        isSelected
          ? <img src={eatFaceSvg} width={40} height={40} alt="Activity Completed" />
          : null
      }
      <Typography variant="subtitle1">{activity.tag}</Typography>
    </Box>
  );
};

export default ActivitiesPanel;

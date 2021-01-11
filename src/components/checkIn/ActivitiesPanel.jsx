import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import eatFaceSvg from 'assets/emoticons/illus_eat.svg';
import StepperButton from 'components/checkIn/StepperButton';


const useStyles = makeStyles(() => ({
  moodImg: {
    maxWidth: '28vw',
  },
  activityCard: {
    cursor: 'pointer',
  },
  selectedActivity: {
    background: COLORS.LIGHT_GRAY,
  },
}));

const getIdArr = (activities) => activities.map((activity) => activity._id);

const markPreSelectedActivities = (activities, selectedActivities) => {
  const userActivities = activities;
  console.log(selectedActivities, userActivities);
  selectedActivities.forEach((activity) => {
    console.log(userActivities[activity._id]);
    userActivities[activity._id].selected = true;
  });
  return userActivities;
};

const ActivitiesPanel = ({
  data, setData, userActivities, navigation,
}) => {
  const classes = useStyles();
  const { previous } = navigation;
  const initActivities = markPreSelectedActivities(userActivities, data.diaryTags);
  const [activities, setActivities] = useState(initActivities);

  const onSelectHandle = (activity) => {
    console.log('selected', activity);
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
      <Box width="100%" height="100vh" mt="-48px" px={2} pb={3} pt={10} display="flex">
        <ActivitySidePanel activities={activities} onSelect={onSelectHandle} onRemove={onRemoveHandle} />
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" p={2}>
          <img src={eatFaceSvg} alt="Eating Happy Face" className={classes.moodImg} width="100%" height="100%" />
        </Box>
      </Box>
      <StepperButton back onClick={previous} />
      <StepperButton />
    </>
  );
};

const ActivitySidePanel = ({ activities, onSelect, onRemove }) => (
  <Paper elevation={24}>
    <Box height="100%" width={375} display="flex" flexDirection="column" justifyContent="flex-end">
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

const ActivityCard = ({ activity, onClick, isSelected = false }) => {
  const classes = useStyles();
  return (
    <Box
      px={2}
      minHeight={56}
      display="flex"
      alignItems="center"
      onClick={onClick}
      className={clsx(classes.activityCard, { [classes.selectedActivity]: isSelected })}
    >
      <Typography variant="subtitle1">{activity.tag}</Typography>
    </Box>
  );
};

export default ActivitiesPanel;

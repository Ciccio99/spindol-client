import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';
import { useActivitiesObject, useCreateActivity } from 'hooks/useActivities';
import { useDailyDiary, useUpdateDailyDiary } from 'hooks/useDailyDiary';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';
import { deepCopyObj } from 'utils/object-utils';
import { Box, Typography } from '@material-ui/core';
import SidePanel from 'components/common/SidePanel';
import StepperButton from 'components/checkIn/StepperButton';
import SearchField from 'components/common/SearchField';
import SuggestedActivitiesPanel from 'components/checkIn/SuggestedActivitiesPanel';
import ActivityCard from 'components/checkIn/ActivityCard';
import CreateActivityCard from 'components/common/CreateActivityCard';
import eatFaceSvg from 'assets/emoticons/illus_eat.svg';

const useStyles = makeStyles(() => ({
  moodImg: {
    maxWidth: '28vw',
  },
  accentText: {
    color: COLORS.RED,
  },
  sidePanel: {
    position: 'relative',
  },
  searchContainer: {
    borderBottom: `1px solid ${COLORS.BORDER_GRAY}`,
  },
  showSuggestions: {
    color: COLORS.DARK_BLUE,
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
  desktopStepper: {
    position: 'absolute',
    right: 100,
    bottom: 30,
  },
  desktopBackStepper: {
    position: 'absolute',
    right: 250,
    bottom: 30,
  },
  mobileStepper: {
    width: '35vw',
  },
  mobileContainer: {
    background: COLORS.WHITE,
  },
}));

const markPreSelectedActivities = (activities, selectedActivities = []) => {
  const userActivities = deepCopyObj(activities);
  selectedActivities.forEach((activity) => {
    userActivities[activity._id].selected = true;
  });
  return userActivities;
};

const ActivitiesPanelDesktop = ({
  activities,
  onSelect,
  onRemove,
  date,
  onNext,
  onPrevious,
  isNextDisabled,
}) => {
  const classes = useStyles();
  const { createActivity } = useCreateActivity();
  const [userActivities, setUserActivities] = useState(
    Object.values(activities) || []
  );
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false);
  const [filter, setFilter] = useState('');

  const onFilterChangeHandle = (value) => setFilter(value);

  const showSuggestionsHandle = () => setShowSuggestionsPanel(true);

  const hideSuggestionsHandle = () => setShowSuggestionsPanel(false);

  const addNewActivity = (activityName) => {
    const data = {
      tag: activityName,
    };
    createActivity(data);
  };

  useEffect(() => {
    const regex = new RegExp(filter, 'i');
    const filteredActivities = Object.values(activities).filter((activity) =>
      regex.test(activity.tag)
    );

    setUserActivities(filteredActivities);
  }, [filter, activities, setUserActivities]);

  return (
    <Box width="100%" height="100vh" mt="-48px" pt="48px" pr={2} display="flex">
      <SidePanel className={classes.sidePanel}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          pt={5}
          pb={4}
          px={2}
        >
          <div>
            <Typography
              className={classes.accentText}
              variant="h4"
              gutterBottom
            >
              {moment(date).format('MMM DD')}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              Did you do any activities yesterday?
            </Typography>
          </div>
          <Box width="100%" mt={2} className={classes.searchContainer}>
            <SearchField
              fullWidth
              onChange={onFilterChangeHandle}
              placeholder="Add / Filter Activities"
              startIconSize={20}
              endIconSize={20}
            />
          </Box>
          <Box mt={3}>
            <Typography
              className={classes.showSuggestions}
              onClick={showSuggestionsHandle}
              variant="subtitle1"
              display="inline"
            >
              Show Suggested Activities
            </Typography>
          </Box>
        </Box>
        <Box width="100%" pb={8} overflow="auto scroll">
          {userActivities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              isSelected={activity.selected}
              onClick={
                activity.selected
                  ? () => {
                      onRemove(activity);
                    }
                  : () => {
                      onSelect(activity);
                    }
              }
            />
          ))}
          {filter ? (
            <CreateActivityCard
              activityName={filter}
              onClick={() => addNewActivity(filter)}
            />
          ) : null}
        </Box>
        {showSuggestionsPanel ? (
          <Box
            position="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            width="100%"
            zIndex={9}
          >
            <SuggestedActivitiesPanel onClose={hideSuggestionsHandle} />
          </Box>
        ) : null}
      </SidePanel>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <img
          src={eatFaceSvg}
          alt="Eating Happy Face"
          className={classes.moodImg}
          width="100%"
          height="100%"
        />
      </Box>
      <StepperButton
        className={classes.desktopBackStepper}
        back
        onClick={onPrevious}
      />
      <StepperButton
        className={classes.desktopStepper}
        onClick={onNext}
        isDisabled={isNextDisabled}
      />
    </Box>
  );
};

const ActivitiesPanelMobile = ({
  activities,
  onSelect,
  onRemove,
  date,
  onNext,
  onPrevious,
  isNextDisabled,
}) => {
  const classes = useStyles();
  const { createActivity } = useCreateActivity();
  const [userActivities, setUserActivities] = useState(
    Object.values(activities) || []
  );
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false);
  const [filter, setFilter] = useState('');

  const onFilterChangeHandle = (value) => setFilter(value);

  const showSuggestionsHandle = () => setShowSuggestionsPanel(true);

  const hideSuggestionsHandle = () => setShowSuggestionsPanel(false);

  const addNewActivity = (activityName) => {
    const data = {
      tag: activityName,
    };
    createActivity(data);
  };

  useEffect(() => {
    const regex = new RegExp(filter, 'i');
    const filteredActivities = Object.values(activities).filter((activity) =>
      regex.test(activity.tag)
    );

    setUserActivities(filteredActivities);
  }, [filter, activities, setUserActivities]);

  return (
    <Box
      className={classes.mobileContainer}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      mt="-48px"
      pt="48px"
      pb={3}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        mt={5}
        pb={4}
        px={2}
      >
        <div>
          <Typography className={classes.accentText} variant="h4" gutterBottom>
            {moment(date).format('MMM DD')}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            Did you do any activities yesterday?
          </Typography>
        </div>
        <Box width="100%" mt={2} className={classes.searchContainer}>
          <SearchField
            fullWidth
            onChange={onFilterChangeHandle}
            placeholder="Add / Filter Activities"
            startIconSize={20}
            endIconSize={20}
          />
        </Box>
        <Box mt={3}>
          <Typography
            className={classes.showSuggestions}
            onClick={showSuggestionsHandle}
            variant="subtitle1"
            display="inline"
          >
            Show Suggested Activities
          </Typography>
        </Box>
      </Box>
      <Box width="100%" pb={8} overflow="auto scroll">
        {userActivities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            isSelected={activity.selected}
            onClick={
              activity.selected
                ? () => {
                    onRemove(activity);
                  }
                : () => {
                    onSelect(activity);
                  }
            }
          />
        ))}
        {filter ? (
          <CreateActivityCard
            activityName={filter}
            onClick={() => addNewActivity(filter)}
          />
        ) : null}
      </Box>
      {showSuggestionsPanel ? (
        <Box
          position="absolute"
          left={0}
          right={0}
          top={56}
          bottom={0}
          width="100%"
          zIndex={9}
        >
          <SuggestedActivitiesPanel onClose={hideSuggestionsHandle} />
        </Box>
      ) : null}
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        py={4}
        mt="auto"
      >
        <StepperButton
          className={classes.mobileStepper}
          back
          onClick={onPrevious}
        />
        <StepperButton
          className={classes.mobileStepper}
          onClick={onNext}
          isDisabled={isNextDisabled}
        />
      </Box>
    </Box>
  );
};

export default function ActivitiesPanel({ navigation, date }) {
  const { isMobile } = useMobile();
  const history = useHistory();
  const { previous } = navigation;
  const { updateDailyDiary } = useUpdateDailyDiary();
  const { data: diary, isLoading: diaryIsLoading } = useDailyDiary(date);
  const {
    data: userActivities,
    isLoading: userActivitiesIsLoading,
  } = useActivitiesObject();
  const [activities, setActivities] = useState(userActivities || {});
  const isNextDisabled = diaryIsLoading || userActivitiesIsLoading;

  useEffect(() => {
    if (
      !diaryIsLoading &&
      !userActivitiesIsLoading &&
      diary &&
      userActivities
    ) {
      setActivities(markPreSelectedActivities(userActivities, diary.diaryTags));
    }
  }, [diary, userActivities, diaryIsLoading, userActivitiesIsLoading]);

  const saveSelectedActivities = () => {
    const activitiesIdList = Object.values(activities)
      .filter((activity) => activity.selected)
      .map((activity) => activity._id);
    const data = {
      _id: diary._id,
      diaryTags: activitiesIdList,
    };
    updateDailyDiary({ data, date });
  };

  const onNextHandle = () => {
    saveSelectedActivities();
    history.push(ROUTES.home);
  };

  const onPreviousHandle = () => {
    saveSelectedActivities();
    previous();
  };

  const onSelectHandle = (activity) => {
    setActivities((prevData) => ({
      ...prevData,
      [activity._id]: {
        ...activity,
        selected: true,
      },
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
  };

  return isMobile ? (
    <ActivitiesPanelMobile
      activities={activities}
      onSelect={onSelectHandle}
      onRemove={onRemoveHandle}
      date={date}
      onNext={onNextHandle}
      onPrevious={onPreviousHandle}
      isNextDisabled={isNextDisabled}
    />
  ) : (
    <ActivitiesPanelDesktop
      activities={activities}
      onSelect={onSelectHandle}
      onRemove={onRemoveHandle}
      date={date}
      onNext={onNextHandle}
      onPrevious={onPreviousHandle}
      isNextDisabled={isNextDisabled}
    />
  );
}

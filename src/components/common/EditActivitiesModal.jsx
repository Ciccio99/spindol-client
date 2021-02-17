import { Box, Grid, Modal, Paper, Slide, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActivityGridItem from 'components/common/ActivityGridItem';
import CreateActivityCard from 'components/common/CreateActivityCard';
import SearchField from 'components/common/SearchField';
import COLORS from 'constants/colors';
import { useActivitiesObject, useCreateActivity } from 'hooks/useActivities';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { deepCopyObj } from 'utils/object-utils';

const useStyles = makeStyles((theme) => ({
  accentText: {
    color: COLORS.RED,
  },
  activityName: {
    marginTop: theme.spacing(1),
  },
  editActivitiesContainer: {
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    backgroundColor: COLORS.WHITE,
    borderBottom: `1px solid ${COLORS.BORDER_GRAY}`,
  },
}));

const ModalWrapper = ({ open, onModalClose, children }) => (
  <Modal
    open={open}
    onClose={onModalClose}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    closeAfterTransition
    disableAutoFocus
    disableEnforceFocus
    disableRestoreFocus
  >
    <Slide direction="up" in={open}>
      <Box
        display="flex"
        justifyContent="center"
        maxWidth="800px"
        width="100%"
        height="100%"
        style={{ outline: 0 }}
      >
        <Paper
          style={{
            backgroundColor: COLORS.BG_WHITE,
            minWidth: '100%',
            minHeight: '80vh',
            height: '100%',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

const EditorPanel = ({ activities, onSelect, onRemove, date }) => {
  const classes = useStyles();
  const { createActivity } = useCreateActivity();
  const [userActivities, setUserActivities] = useState(
    Object.values(activities) || []
  );
  const [filter, setFilter] = useState('');

  const onFilterChangeHandle = (value) => setFilter(value);

  const addNewActivity = (activityName) => {
    const data = {
      tag: activityName,
    };
    createActivity(data);
  };

  useEffect(() => {
    if (!activities) return;

    const regex = new RegExp(filter, 'i');
    const filteredActivities = Object.values(activities).filter((activity) =>
      regex.test(activity.tag)
    );

    setUserActivities(filteredActivities);
  }, [filter, activities, setUserActivities]);

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
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
            {moment(date).format('MMM DD, YYYY')}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            What activities did you do?
          </Typography>
        </div>
        <Box width="100%" mt={2} p={2} className={classes.searchContainer}>
          <SearchField
            fullWidth
            onChange={onFilterChangeHandle}
            placeholder="Add / Filter Activities"
            startIconSize={20}
            endIconSize={20}
          />
        </Box>
      </Box>
      {filter ? (
        <CreateActivityCard
          activityName={filter}
          onClick={() => addNewActivity(filter)}
        />
      ) : null}
      <Box width="100%" p={2} pb={8} overflow="auto scroll">
        <Grid container spacing={3}>
          {userActivities.map((activity) => (
            <Grid item xs={4} key={activity._id}>
              <ActivityGridItem
                activity={activity}
                onClick={
                  activity.selected
                    ? () => {
                        onRemove(activity);
                      }
                    : () => {
                        onSelect(activity);
                      }
                }
                isSelected={activity.selected}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const markPreSelectedActivities = (activities, selectedActivities = []) => {
  const userActivities = deepCopyObj(activities);
  selectedActivities.forEach((activity) => {
    userActivities[activity._id].selected = true;
  });
  return userActivities;
};

export default function EditActivitiesModal({
  selectedActivities,
  date,
  onSave,
  open,
  onModalClose,
}) {
  const { data: activitiesObj, isLoading } = useActivitiesObject();
  const [activities, setActivities] = useState(activitiesObj || {});

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

  const onCloseHandle = () => {
    onSave(activities);
    onModalClose();
  };

  useEffect(() => {
    if (!isLoading && activitiesObj) {
      setActivities(
        markPreSelectedActivities(activitiesObj, selectedActivities)
      );
    }
  }, [activitiesObj, selectedActivities, isLoading]);

  return (
    <ModalWrapper open={open} onModalClose={onCloseHandle}>
      <EditorPanel
        date={date}
        onSelect={onSelectHandle}
        onRemove={onRemoveHandle}
        activities={activities}
      />
    </ModalWrapper>
  );
}

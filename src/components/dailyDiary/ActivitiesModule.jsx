import React, { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useDailyDiary,
  useUpdateDailyDiaryActivities,
} from 'hooks/useDailyDiary';
import COLORS from 'constants/colors';
import { getShape } from 'utils/shape-utils';
import EditActivitiesModal from 'components/common/EditActivitiesModal';

const useStyles = makeStyles((theme) => ({
  accentText: {
    color: COLORS.RED,
  },
  activityName: {
    marginTop: theme.spacing(1),
  },
  editText: {
    color: COLORS.DARK_BLUE,
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
}));

const ActivityGridItem = ({ activity }) => {
  const classes = useStyles();
  const Shape = getShape(activity.shapeId);

  return (
    <Box p={1} display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Shape fill={activity.shapeColor} width={40} height={40} />
        <Typography
          variant="body1"
          align="center"
          className={classes.activityName}
        >
          {activity.tag}
        </Typography>
      </Box>
    </Box>
  );
};

export default function ActivitiesModule({ date }) {
  const classes = useStyles();
  const { data, isLoading } = useDailyDiary(date);
  const { updateDailyDiaryActivities } = useUpdateDailyDiaryActivities();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const onEditorOpenHandle = () => {
    setEditModalOpen(true);
  };

  const onEditorCloseHandle = () => {
    setEditModalOpen(false);
  };

  const saveSelectedActivities = (activities) => {
    if (typeof activities === 'undefined') return;

    const activitiesList = Object.values(activities).filter(
      (activity) => activity.selected
    );
    const dto = {
      _id: data._id,
      diaryTags: activitiesList,
    };
    updateDailyDiaryActivities({ data: dto, date });
  };

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <Typography variant="subtitle1" className={classes.accentText}>
        Activities
      </Typography>
      <Box mt={2}>
        <Paper elevation={24}>
          <Box p={3}>
            <Grid container spacing={2}>
              {data.diaryTags.map((activity) => (
                <Grid item key={activity._id} xs={4}>
                  <ActivityGridItem activity={activity} />
                </Grid>
              ))}
            </Grid>
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Typography
                variant="subtitle1"
                display="inline"
                className={classes.editText}
                onClick={onEditorOpenHandle}
              >
                Edit Activities
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <EditActivitiesModal
        open={editModalOpen}
        onModalClose={onEditorCloseHandle}
        selectedActivities={data.diaryTags}
        date={date}
        onSave={saveSelectedActivities}
      />
    </div>
  );
}

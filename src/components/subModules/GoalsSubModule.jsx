import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Button, LinearProgress, Popover, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import moment from 'moment-timezone';
import { useAsync } from 'react-async';
import useMobile from 'hooks/useMobile';
import { getGoalTags, updateTag } from 'services/TagsServices';
import { StreakBox, HighStreakBox } from 'components/Streaks';
import AddGoalModal from 'components/modals/AddGoalModal';
import ConfirmRemoveGoalModal from 'components/modals/ConfirmRemoveGoalModal';
import SleepGoalDetailsModal from 'components/modals/SleepGoalDetailsModal';
import COLORS from 'constants/colors';

const getDateSubtitle = (date, enableVariedDateText = false) => {
  const givenDate = moment(moment.utc(date).format('YYYY-MM-DD'));
  if (enableVariedDateText) {
    const now = moment();
    if (now.diff(givenDate, 'day') === 0) {
      return (
        <div>
          <Typography variant="subtitle1" display="inline">
            {'What goals did you achieve on '}
          </Typography>
          <Typography variant="subtitle1" color="primary" display="inline">
            <strong>today</strong>
          </Typography>
          <Typography variant="subtitle1" display="inline">
            ?
          </Typography>
        </div>
      );
    }

    if (now.diff(givenDate, 'day') === 1) {
      return (
        <div>
          <Typography variant="subtitle1" display="inline">
            {'What goals did you achieve '}
          </Typography>
          <Typography variant="subtitle1" color="primary" display="inline">
            <strong>{`yesterday - ${givenDate.format('dddd, MMM DD')}`}</strong>
          </Typography>
          <Typography variant="subtitle1" display="inline">
            ?
          </Typography>
        </div>
      );
    }
  }
  return (
    <div>
      <Typography variant="subtitle1" display="inline">
        {'What goals did you achieve on '}
      </Typography>
      <Typography variant="subtitle1" color="primary" display="inline">
        <strong>{givenDate.format('dddd, MMM DD')}</strong>
      </Typography>
      <Typography variant="subtitle1" display="inline">
        ?
      </Typography>
    </div>
  );
};

const GoalsSubModule = ({
  date, handleGoalComplete, handleGoalIncomplete, currentTags, enableVariedDateText,
}) => {
  const {
    data, isPending, error, setData,
  } = useAsync(getGoalTags);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (isPending || !data || !data.length) {
      return;
    }

    const updatedGoals = data.map((goalTag) => {
      if (currentTags.some((tag) => tag._id === goalTag._id)) {
        return <CompleteGoalPanel key={goalTag._id} goalTag={goalTag} onClickHandle={() => { handleGoalIncomplete(goalTag); }} handleRemove={() => { handleRemoveGoal(goalTag); }} />;
      }
      return <IncompleteGoalPanel key={goalTag._id} goalTag={goalTag} onClickHandle={() => { handleGoalComplete(goalTag); }} handleRemove={() => { handleRemoveGoal(goalTag); }}/>;
    });

    setGoals(updatedGoals);
  }, [data, currentTags]);

  const handleAddGoal = (goalTag) => {
    console.log('Goal Added: ', goalTag);
    setData([...data, goalTag]);
  };

  const handleRemoveGoal = async (goalTag) => {
    const updatedGoal = await updateTag({
      _id: goalTag._id,
      isGoal: false,
    });
    const updatedGoals = data.filter((goal) => (goal._id !== updatedGoal._id));
    setData(updatedGoals);
  };

  if (error) {
    return (
      <div>
        <Typography color="error" variant="subtitle1">
          {error}
        </Typography>
      </div>
    );
  }

  if (isPending) {
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  if (data) {
    console.log(data);
    return (
      <div>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Typography variant="h6">Goals</Typography>
            {getDateSubtitle(date, enableVariedDateText)}
          </div>
          <div>
            <CreateGoalButton onClickHandle={() => { setIsModalOpen(true); }} />
          </div>
        </Box>
        { goals }
        <AddGoalModal addGoalHandle={handleAddGoal} open={isModalOpen} handleIsModalOpen={setIsModalOpen} />
      </div>
    );
  }

  return null;
};

const CreateGoalButton = ({ onClickHandle }) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return (
      <AddCircleOutlineTwoToneIcon onClick={onClickHandle} style={{ cursor: 'pointer' }} color="secondary" />
    );
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<AddCircleOutlineTwoToneIcon />}
      onClick={onClickHandle}
    >
      <Typography variant="caption">Add Goal</Typography>
    </Button>
  );
};

const useGoalPanelStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: COLORS.BG_WHITE,
      transform: 'scale(1.01)',
    },
    '&:active': {
      backgroundColor: COLORS.LIGHT_GRAY,
    },
  },
}));

const IncompleteGoalPanel = ({ goalTag, handleRemove, onClickHandle }) => (
  <Box mt={3} onClick={onClickHandle}>
    <Paper elevation={2} classes={useGoalPanelStyles()}>
      <Box px={1} py={1} display="flex" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
          <RadioButtonUncheckedIcon style={{ color: '#CCC' }} fontSize="large" />
        </Box>
        <InternalGoalPanel goalTag={goalTag} handleRemove={handleRemove} />
      </Box>
    </Paper>
  </Box>
);

const CompleteGoalPanel = ({ goalTag, handleRemove, onClickHandle }) => (
  <Box mt={3} onClick={onClickHandle}>
    <Paper elevation={2} classes={useGoalPanelStyles()}>
      <Box px={1} py={1} display="flex" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
          <CheckCircleIcon color="primary" fontSize="large" />
        </Box>
        <InternalGoalPanel goalTag={goalTag} handleRemove={handleRemove} />
      </Box>
    </Paper>
  </Box>
);

const useInternalGoalPanelStyles = makeStyles((theme) => ({
  popoverPaper: {
    borderRadius: '15px',
    padding: theme.spacing(2)
  },
  buttonIconRoot: {
    marginLeft: theme.spacing(1),
    borderRadius: '5px',
    zIndex: 10,
  },
  removeButtonRoot: {
    borderRadius: '5px',
    textTransform: 'none',
  },
}));

const InternalGoalPanel = ({ goalTag, handleRemove}) => {
  const classes = useInternalGoalPanelStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const open = Boolean(anchorEl);

  const handlePopoverClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleModalOpen = (event) => {
    event.stopPropagation();
    setIsOpenRemoveModal(true);
  }

  const handleModalClose = (event) => {
    event.stopPropagation();
    setIsOpenRemoveModal(false);
    handlePopoverClose(event);
  };

  const handleInfoModalOpen = (event) => {
    event.stopPropagation();
    setIsOpenInfoModal(true);
  }

  const handleInfoModalClose = (event) => {
    event.stopPropagation();
    setIsOpenInfoModal(false);
    handlePopoverClose(event);
  };

  const handleRemoveGoal = async (event) => {
    event.stopPropagation();
    await handleRemove();
    setIsOpenRemoveModal(false);
    handlePopoverClose(event);
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="subtitle1">{goalTag.tag}</Typography>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box display="flex" alignItems="center">
          <Grid container alignItems="center" spacing={useMobile().isMobile ? 0 : 2}>
            <Grid item xs={12} sm="auto">
              <StreakBox value={goalTag?.stats?.currentStreak || 0} />
            </Grid>
            <Grid item xs={12} sm="auto">
              <HighStreakBox value={goalTag?.stats?.highScore || 0} />
            </Grid>
          </Grid>
          <IconButton onClick={handlePopoverClick} disableRipple size="small" classes={{ root: classes.buttonIconRoot }}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{ paper: classes.popoverPaper }}
            elevation={2}
          >
            <Box display="flex" flexDirection="column">
              {
                goalTag.sleepTrial
                && (
                  <Button onClick={handleInfoModalOpen} disableRipple classes={{ root: classes.removeButtonRoot }}>
                    <Typography variant="subtitle2" noWrap>View Details</Typography>
                  </Button>
                )
              }

              <Button onClick={handleModalOpen} disableRipple classes={{ root: classes.removeButtonRoot }} >
                <Typography variant="subtitle2" color="error" noWrap>Remove Goal</Typography>
              </Button>
            </Box>
          </Popover>
          </Box>
        </Grid>
      </Grid>
      <ConfirmRemoveGoalModal goalTag={goalTag} open={isOpenRemoveModal} handleRemove={handleRemoveGoal} handleModalClose={handleModalClose} />
      {
        goalTag.sleepTrial?._id
        && <SleepGoalDetailsModal sleepTrial={goalTag.sleepTrial} open={isOpenInfoModal} handleModalClose={handleInfoModalClose} />
      }
    </>
  );
};
export default GoalsSubModule;

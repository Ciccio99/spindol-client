import React, { useState } from 'react';
import {
  Box, Grid, Modal, Typography, Paper, LinearProgress, Slide,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getAllSleepTrials } from 'services/SleepTrialServices';
import { getAllUserTags, insertTag, updateTag } from 'services/TagsServices';
import { useAsync } from 'react-async';
import TabPanel from 'components/tabPanel/TabPanel';
import GoalMenuButton from 'components/common/GoalMenuButton';
import COLORS from 'constants/colors';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import SleepTrialsTab from '../../common/SleepTrialsTab';
import ExistingActivitiesTab from './ExistingActivitiesTab';
import CreateGoalTab from './CreateGoalTab';


const ModalWrapper = ({
  open, handleOnModalClose, cancelHandle, children,
}) => (
  <Modal
    open={open}
    onClose={handleOnModalClose}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    closeAfterTransition
    disableAutoFocus
    disableEnforceFocus
    disableRestoreFocus
  >
    <Slide direction="up" in={open}>
      <Box display="flex" justifyContent="center" maxWidth="800px" width="100%" height="100%" style={{ outline: 0 }}>
        <Paper style={{
          backgroundColor: COLORS.BG_WHITE, minWidth: '100%', minHeight: '80vh', height: '100%',
        }}
        >
          <Box p={2} display="flex" justifyContent="center" position="relative">
            <Box
              position="absolute"
              left="2%"
              top="20%"
              style={{ cursor: 'pointer' }}
              onClick={cancelHandle || handleOnModalClose}
              display="flex"
              alignItems="center"
            >
              {
                cancelHandle && <ArrowBackIosIcon fontSize="small" color="primary" />
              }
              <Typography variant="subtitle2" color="primary">
                { cancelHandle ? 'Back' : 'Cancel'}
              </Typography>
            </Box>

            <Typography variant="h6" align="center">
              Add Goal
            </Typography>
          </Box>
          {children}
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

const fetchInitData = async () => {
  const trialsReq = getAllSleepTrials();
  const tagsReq = getAllUserTags();
  const res = await Promise.all([trialsReq, tagsReq]);
  const tags = res[1];
  console.log(res);
  const data = {
    sleepTrials: res[0],
    tags: tags.length
      ? tags.filter((tag) => (!tag.isGoal)).sort((a, b) => (a.tag.toLowerCase() < b.tag.toLowerCase() ? -1 : 1))
      : [],
  };

  return data;
};

const AddGoalModal = ({
  open, handleIsModalOpen, addGoalHandle,
}) => {
  const dispatchAlert = useAlertSystemDispatch();
  const { data, isPending, error, setData } = useAsync(fetchInitData);
  const [tabValue, setTabValue] = useState(0);

  const handleOnModalClose = () => {
    handleIsModalOpen(false);
    setTabValue(0);
  };

  const handleCreateSleepTrialGoal = async (sleepTrial) => {
    try {
      const dto = {
        tag: sleepTrial.name,
        isGoal: true,
        sleepTrial: sleepTrial._id,
      };
      const newGoalTag = await insertTag(dto);
      addGoalHandle(newGoalTag);
      handleOnModalClose();
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  const handleCreateGoal = async (tagValue) => {
    try {
      const dto = {
        tag: tagValue,
        isGoal: true,
      };
      const newGoalTag = await insertTag(dto);
      addGoalHandle(newGoalTag);
      handleOnModalClose();
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  const handleConvertTagToGoal = async (tag) => {
    try {
      const dto = {
        _id: tag._id,
        isGoal: true,
      };
      const newGoalTag = await updateTag(dto);
      addGoalHandle(newGoalTag);
      const updatedTags = data.tags.filter((t) => (t._id !== tag._id));
      setData({
        ...data,
        tags: updatedTags,
      });
      handleOnModalClose();
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  if (isPending) {
    return (
      <ModalWrapper open={open} handleOnModalClose={handleOnModalClose}>
        <LinearProgress color="secondary" />
      </ModalWrapper>
    );
  }

  if (error) {
    return (
      <ModalWrapper open={open} handleOnModalClose={handleOnModalClose}>
        <Typography variant="subtitle2" color="error">{error.message}</Typography>
      </ModalWrapper>
    );
  }

  if (data) {
    return (
      <ModalWrapper open={open} handleOnModalClose={handleOnModalClose} cancelHandle={tabValue === 0 ? undefined : () => { setTabValue(0); }}>
        <Box maxWidth="inherit" maxHeight="92%" overflow="auto scroll">
          <TabPanel index={0} value={tabValue} style={{ width: '100%' }}>
            <Box p={2}>
              <Grid container direction="column" alignItems="stretch" spacing={2}>
                <Grid item>
                  <GoalMenuButton label="Try our Sleep Goals" subLabel="We have some ideas for you" onClick={() => { setTabValue(1); }} />
                </Grid>
                <Grid item>
                  <GoalMenuButton
                    label="Select an existing activity"
                    subLabel="Reinforce one of your current activities"
                    onClick={() => { setTabValue(2); }}
                  />
                </Grid>
                <Grid item>
                  <GoalMenuButton
                    label="Create a new activity goal"
                    onClick={() => { setTabValue(3); }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel index={1} value={tabValue} style={{ maxHeight: 'inherit' }}>
            <SleepTrialsTab sleepTrials={data.sleepTrials} createGoalHandle={handleCreateSleepTrialGoal} />
          </TabPanel>
          <TabPanel index={2} value={tabValue}>
            <ExistingActivitiesTab tags={data.tags} createGoalHandle={handleConvertTagToGoal} />
          </TabPanel>
          <TabPanel index={3} value={tabValue}>
            <CreateGoalTab createGoalHandle={handleCreateGoal} />
          </TabPanel>
        </Box>
      </ModalWrapper>
    );
  }

  return null;
};

export default AddGoalModal;

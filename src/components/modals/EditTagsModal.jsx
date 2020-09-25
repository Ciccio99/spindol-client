import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Modal,
  Slide,
  TextField,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import LinkText from 'components/linkText/LinkText';
import { getAllUserTags, insertTag } from 'services/TagsServices';
import useMobile from 'hooks/useMobile';
import TabPanel from 'components/tabPanel/TabPanel';
import SleepTrialsTab from 'components/common/SleepTrialsTab';
import { ActivityChip, SleepChip } from 'components/common/TagChips';
import COLORS from 'constants/colors';
import styles from './Modals.module.css';

const ModalWrapper = ({ open, handleOnModalClose, children }) => (
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
          {children}
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

const getOrderedTags = async () => {
  const tags = await getAllUserTags();
  tags.sort((a, b) => (a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1));
  const [sleepTags, activityTags] = tags.reduce((tagsArr, tag) => {
    if (tag.sleepTrial) {
      tagsArr[0].push(tag);
    } else {
      tagsArr[1].push(tag);
    }
    return tagsArr;
  }, [[], []]);
  return { sleepTags, activityTags };
};

const EditTagsModal = ({
  open, currentTags, handleModal, handleSaveTags,
}) => {
  const {
    data, isPending, error, setData,
  } = useAsync(getOrderedTags);
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [selectedTags, setSelectedTags] = useState(currentTags);
  const [tagsChanged, setTagsChanged] = useState(false);

  const [disableCreate, setDisableCreate] = useState(false);

  useEffect(() => {
    if (selectedTags.length !== currentTags.length) {
      setTagsChanged(true);
      return;
    }

    for (let i = 0; i < selectedTags.length; i += 1) {
      if (!currentTags.some((tag) => tag._id === selectedTags[i]._id)) {
        setTagsChanged(true);
        return;
      }
    }

    setTagsChanged(false);
  }, [selectedTags, currentTags]);

  const handleTagSelect = (tag) => {
    setSelectedTags((prevState) => ([...prevState, tag]));
  };

  const handleTagDeSelect = (removeTag) => {
    setSelectedTags((prevState) => prevState.filter((tag) => tag._id !== removeTag._id));
  };

  const handleOnModalClose = () => {
    if (tagsChanged) {
      handleSaveTags(selectedTags);
    }
    handleModal(false);
    setTabValue(0);
  };

  const handleTagSubmit = async (tagInput) => {
    setDisableCreate(true);
    try {
      if (!tagInput || tagInput === '') {
        throw new Error('Tag is empty!');
      }
      const newTag = await insertTag({ tag: tagInput.trim() });
      setData({ sleepTags: data.sleepTags, activityTags: [...data.activityTags, newTag] });
    } catch (e) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: e.message,
      });
    } finally {
      setDisableCreate(false);
    }
  };

  const handleCreateSleepTag = React.useCallback(async (sleepTrial) => {
    try {
      const dto = {
        tag: sleepTrial.name,
        isGoal: true,
        sleepTrial: sleepTrial._id,
      };
      const newSleepTag = await insertTag(dto);
      setData({ sleepTags: [...data.sleepTags, newSleepTag], activityTags: data.activityTags });
    } catch (e) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: e.message,
      });
    } finally {
      setTabValue(0);
    }
  }, [data]);

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
        <Typography variant="subtitle1" color="error">{error.message}</Typography>
      </ModalWrapper>
    );
  }

  if (data) {
    return (
      <ModalWrapper open={open} handleOnModalClose={handleOnModalClose}>
        <TabPanel index={0} value={tabValue} style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Box px={2} pt={2} position="relative">
            <Typography variant="h6" align="center">Edit Daily Tags</Typography>
            <Box
              position="absolute"
              right="2%"
              top="20%"
              style={{ cursor: 'pointer' }}
              onClick={() => { setTabValue(0); }}
              display="flex"
              alignItems="center"
            >
              {
                tagsChanged
                  ? <CheckCircleOutlineIcon className={styles.closeSuccessButton} onClick={handleOnModalClose} />
                  : <CancelOutlinedIcon color="action" className={styles.closeButton} onClick={handleOnModalClose} />
              }
            </Box>
          </Box>
          <EditTagsTab
            activityTags={data.activityTags}
            sleepTags={data.sleepTags}
            handleTagSelect={handleTagSelect}
            handleTagDeSelect={handleTagDeSelect}
            selectedTags={selectedTags}
            handleSetSleepTab={() => { setTabValue(1); }}
          />
          <Box p={4} pt={0} style={{ backgroundColor: COLORS.BG_WHITE, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }} position="absolute" width="inherit" bottom={0} left="0" right="0" display="flex" flexDirection="column" alignItems="center">
            <CreateTagForm handleTagSubmit={handleTagSubmit} disableCreate={disableCreate} />
            <Box mt={2}>
              <LinkText to={{ pathname: '/settings', hash: 'tags' }}>Manage Habit Tags</LinkText>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel index={1} value={tabValue}>
          <Box p={2} pb={0} position="relative">
            <Box
              position="absolute"
              left="2%"
              top="20%"
              style={{ cursor: 'pointer' }}
              onClick={() => { setTabValue(0); }}
              display="flex"
              alignItems="center"
            >
              <ArrowBackIosIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2" color="primary">Back</Typography>
            </Box>

            <Typography variant="h6" align="center">
              Add Sleep Tag
            </Typography>
          </Box>
          <Box maxHeight="94vh" overflow="auto scroll">
            <SleepTrialsTab createTagHandle={handleCreateSleepTag} />
          </Box>
        </TabPanel>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper open={open} handleOnModalClose={handleOnModalClose} />
  );
};

const AddSleepTagButton = ({ onClickHandle }) => {
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
      disableRipple
    >
      <Typography variant="caption">Explore Sleep Tags</Typography>
    </Button>
  );
};

const EditTagsTab = ({
  activityTags, sleepTags, selectedTags, handleTagSelect, handleTagDeSelect, handleSetSleepTab,
}) => (
  <Box pb={10} maxHeight={useMobile().isMobile ? '76vh' : '81vh'} overflow="auto scroll">
    <Box p={4} pt={2} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Typography variant="subtitle1">Sleep Tags</Typography>
        <AddSleepTagButton onClickHandle={handleSetSleepTab} />
      </Box>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {
            sleepTags.map((tag) => {
              if (selectedTags.some((selectTag) => selectTag._id === tag._id)) {
                return (
                  <Grid item key={tag._id}>
                    <SleepChip
                      tag={tag}
                      isSelected
                      handleOnClick={() => { handleTagDeSelect(tag); }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={tag._id}>
                  <SleepChip
                    tag={tag}
                    handleOnClick={() => { handleTagSelect(tag); }}
                  />
                </Grid>
              );
            })
          }
      </Grid>
    </Box>
    <Divider />
    <Box p={4} pt={2} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
      <Box mb={2} width="100%">
        <Typography variant="subtitle1" gutterBottom>Activity Tags</Typography>
      </Box>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {
            activityTags.map((tag) => {
              if (selectedTags.some((selectTag) => selectTag._id === tag._id)) {
                return (
                  <Grid item key={tag._id}>
                    <ActivityChip
                      tag={tag}
                      isSelected
                      handleOnClick={() => { handleTagDeSelect(tag); }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={tag._id}>
                  <ActivityChip
                    tag={tag}
                    handleOnClick={() => { handleTagSelect(tag); }}
                  />
                </Grid>
              );
            })
          }
          {
            activityTags.map((tag) => {
              if (selectedTags.some((selectTag) => selectTag._id === tag._id)) {
                return (
                  <Grid item key={tag._id}>
                    <ActivityChip
                      tag={tag}
                      isSelected
                      handleOnClick={() => { handleTagDeSelect(tag); }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={tag._id}>
                  <ActivityChip
                    tag={tag}
                    handleOnClick={() => { handleTagSelect(tag); }}
                  />
                </Grid>
              );
            })
          }
          {
            activityTags.map((tag) => {
              if (selectedTags.some((selectTag) => selectTag._id === tag._id)) {
                return (
                  <Grid item key={tag._id}>
                    <ActivityChip
                      tag={tag}
                      isSelected
                      handleOnClick={() => { handleTagDeSelect(tag); }}
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={tag._id}>
                  <ActivityChip
                    tag={tag}
                    handleOnClick={() => { handleTagSelect(tag); }}
                  />
                </Grid>
              );
            })
          }
      </Grid>
    </Box>
  </Box>
);

const CreateTagForm = ({ handleTagSubmit, disableCreate }) => {
  const [tagInput, setTagInput] = useState('');
  const submitTagHandle = (e) => {
    e.preventDefault(tagInput);
    handleTagSubmit(tagInput);
    setTagInput('');
  };
  return (
    <Box mt={2} component="form" onSubmit={submitTagHandle} autoComplete="off" minWidth="100%">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            value={tagInput}
            name="tagInput"
            type="text"
            label="New Tag"
            placeholder="New Tag"
            onChange={(e) => { setTagInput(e.target.value); }}
            fullWidth
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button disabled={!tagInput || disableCreate} type="submit" color="secondary" variant="contained" disableElevation size="large" fullWidth>
            <Typography variant="body2">Create</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditTagsModal;

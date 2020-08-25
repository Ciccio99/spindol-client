import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  Modal,
  Slide,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import LinkText from 'components/linkText/LinkText';
import { getAllUserTags, insertTag } from 'services/TagsServices';
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
      <Box m={1} display="flex" justifyContent="center" maxWidth="600px" style={{ outline: 0 }}>
        <Paper>
          {children}
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

const getOrderedTags = async () => {
  const tags = await getAllUserTags();
  tags.sort((a, b) => (a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1));
  return tags;
};

const EditTagsModal = ({
  open, currentTags, handleModal, handleSaveTags,
}) => {
  const {
    data, isPending, error, setData,
  } = useAsync(getOrderedTags);
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [selectedTags, setSelectedTags] = useState(currentTags);
  const [tagsChanged, setTagsChanged] = useState(false);
  const [tagInput, setTagInput] = useState('');
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
    // if (selectedTags.length === tags.length) {
    //   for (let i = 0; i < selectedTags.length; i += 1) {
    //     if (!tags.includes(selectedTags[i])) {
    //       handleSaveTags(selectedTags);
    //       break;
    //     }
    //   }
    // } else {
    //   handleSaveTags(selectedTags);
    // }
    if (tagsChanged) {
      handleSaveTags(selectedTags);
    }

    handleModal(false);
  };

  const handleTagSubmit = async (event) => {
    event.preventDefault();
    setDisableCreate(true);
    try {
      if (tagInput === '') {
        throw new Error('Tag is empty!');
      }

      const newTag = await insertTag({ tag: tagInput.trim() });
      setData([...data, newTag]);
    } catch (e) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: e.message,
      });
    } finally {
      setTagInput('');
      setDisableCreate(false);
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
        <Typography variant="subtitle1" color="error">{error.message}</Typography>
      </ModalWrapper>
    );
  }

  if (data) {
    return (
      <ModalWrapper open={open} handleOnModalClose={handleOnModalClose}>
        <Box display="flex" justifyContent="space-between" px={2} pt={2}>
          <Typography variant="h6">Edit Day Tags</Typography>
          {
            tagsChanged
              ? <CheckCircleOutlineIcon className={styles.closeSuccessButton} onClick={handleOnModalClose} />
              : <CancelOutlinedIcon color="action" className={styles.closeButton} onClick={handleOnModalClose} />
          }
        </Box>
        <Box p={4} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
          <Grid container justify="center" alignItems="center" spacing={2}>
            {
              data.map((tag) => {
                if (selectedTags.some((selectTag) => selectTag._id === tag._id)) {
                  return (
                    <Grid item key={tag._id}>
                      <Chip
                        label={tag.tag}
                        color="primary"
                        variant="default"
                        onClick={() => { handleTagDeSelect(tag); }}
                        clickable
                      />
                    </Grid>
                  );
                }
                return (
                  <Grid item key={tag._id}>
                    <Chip
                      label={tag.tag}
                      onClick={() => { handleTagSelect(tag); }}
                      disableRipple
                      clickable
                    />
                  </Grid>
                );
              })
            }
          </Grid>
          <Box mt={4} component="form" onSubmit={handleTagSubmit} autoComplete="off" minWidth="100%">
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
          <Box mt={4}>
            <LinkText to={{ pathname: '/settings', hash: 'tags' }}>Manage Habit Tags</LinkText>
          </Box>
        </Box>
      </ModalWrapper>
    );
  }
  return (
    <ModalWrapper open={open} handleOnModalClose={handleOnModalClose}>
      <Box p={4} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
        <Box mt={4} component="form" onSubmit={handleTagSubmit} autoComplete="off" minWidth="100%">
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
        <Box mt={4}>
          <LinkText to={{ pathname: '/settings', hash: 'tags' }}>Manage Habit Tags</LinkText>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default EditTagsModal;

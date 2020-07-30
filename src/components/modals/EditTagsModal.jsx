import React, { useState } from 'react';
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
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import defaultTags from 'constants/defaultTags';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import UserServices from 'services/UserServices';
import LinkText from 'components/linkText/LinkText';
import styles from './Modals.module.css';

const getAvailableTags = (customTags = []) => {
  const tagSet = Array.from(new Set(defaultTags.concat(customTags)));
  tagSet.sort();
  return tagSet;
}

const EditTagsModal = ({ open, tags, handleModal, handleSaveTags }) => {
  const user = useUserState();
  const dispatchUser = useUserDispatch();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const availableTags = getAvailableTags(tags.concat(user.settings?.tags || []));
  const [selectedTags, setSelectedTags] = useState(tags);
  const [tagInput, setTagInput] = useState('');

  const handleTagSelect = (tag) => {
    setSelectedTags(prevState => ([...prevState, tag]));
  };

  const handleTagDeSelect = (removeTag) => {
    setSelectedTags(prevState => prevState.filter(tag => tag !== removeTag));
  }

  const handleOnModalClose = () => {
    if (selectedTags.length === tags.length) {
      for (let i = 0; i < selectedTags.length; i += 1) {
        if (!tags.includes(selectedTags[i])) {
          handleSaveTags(selectedTags);
          break;
        }
      }
    } else {
      handleSaveTags(selectedTags);
    }

    handleModal(false);
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tagInput === '') {
        throw new Error('Tag is empty!')
      }
      const newTag = tagInput.toLowerCase();
      if (user?.settings?.tags.includes(newTag)
      || defaultTags.includes(newTag)) {
        throw new Error('Tag already exists!')
      }

      const customTags = Array.from(user.settings.tags);
      customTags.push(newTag);

      const data = await UserServices.insertUserTags(customTags);
      const updatedUser = user;
      if (updatedUser.settings) {
        updatedUser.settings.tags = data;
      } else {
        updatedUser.settings = {
          tags: data,
        };
      }
      dispatchUser({
        type: 'USER_UPDATE',
        user: updatedUser,
      });
    } catch (error) {
      dispatchAlertSystem({
        type: 'WARNING',
        message: error.message,
      });
    } finally {
      setTagInput('');
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => { handleOnModalClose(); }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <Slide direction="up" in={open}>
           <Box m={1} display="flex" justifyContent="center" maxWidth="600px" style={{ outline: 0 }}>
          <Paper>
            <Box>
              <Box display="flex" justifyContent="space-between" px={2} pt={2}>
                <Typography variant="h6">Edit Day Tags</Typography>
                <CancelOutlinedIcon color="action" className={styles.closeButton} onClick={handleOnModalClose} />
              </Box>
              <Box p={4} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
                  <Grid container justify="center" alignItems="center" spacing={2}>
                    {
                      availableTags.map((tag) => {
                        if (selectedTags.includes(tag)) {
                          return (
                            <Grid item key={tag}>
                              <Chip
                                label={tag}
                                color="primary"
                                variant="default"
                                onClick={() => { handleTagDeSelect(tag); }}
                                clickable
                              />
                            </Grid>
                          );
                        }
                        return (
                          <Grid item key={tag}>
                            <Chip
                              label={tag}
                              onClick={() => { handleTagSelect(tag) }}
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
                          onChange={(e) => {setTagInput(e.target.value)}}
                          fullWidth
                          variant="outlined"
                          size="small"
                        >
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button disabled={!tagInput} type="submit" color="secondary" variant="contained" disableElevation size="large" fullWidth>
                          <Typography variant="body2">Add Tag</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={4}>
                    <LinkText to={{ pathname: "/settings", hash: "tags" }}>Manage Habit Tags</LinkText>
                  </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </Modal>
  );
};

export default EditTagsModal;

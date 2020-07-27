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
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import defaultTags from 'constants/defaultTags';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import UserServices from 'services/UserServices';
import styles from './Modals.module.css';

const EditTagsModal = ({ open, tags, handleModal, handleSaveTags }) => {
  const user = useUserState();
  const dispatchUser = useUserDispatch();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [selectedTags, setSelectedTags] = useState(null);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    let tagSet = Array.from(new Set(defaultTags.concat(user?.settings?.tags || [])));
    tagSet.sort();
    const tagMap = {};
    tagSet.forEach((tag) => {
      tagMap[tag] = {
        value: tag,
        selected: tags?.includes(tag) ? true : false,
      };
    })
    setSelectedTags(tagMap);
  }, [tags, user]);

  const handleTagSelect = (tagValue) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [tagValue]: { value: tagValue, selected: true }
    }));
  };

  const handleTagDeSelect = (tagValue) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [tagValue]: { value: tagValue, selected: false }
    }));
  }

  const handleOnModalClose = () => {
    const tagsToSave = Object.keys(selectedTags)
      .filter((key) => selectedTags[key].selected)
      .map((key) => {
      return selectedTags[key].value;
    });
    if (tagsToSave.length === tags.length) {
      for (let i = 0; i < tagsToSave.length; i += 1) {
        if (!tags.includes(tagsToSave[i])) {
          handleSaveTags(tagsToSave);
          break;
        }
      }
    } else {
      handleSaveTags(tagsToSave);
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
              <Box p={3} pt={0} pb={4} display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
                <Box mt={4}>
                  <Grid container justify="center" alignItems="center" spacing={2}>
                    {Object.keys(selectedTags || {}).map((key) => (
                      <Grid key={key} item >
                      { selectedTags[key].selected
                        ? <Chip
                          label={selectedTags[key].value}
                          color="primary"
                          variant="default"
                          onClick={() => { handleTagDeSelect(selectedTags[key].value) }}
                          clickable
                        />
                        :<Chip
                          label={selectedTags[key].value}
                          onClick={() => { handleTagSelect(selectedTags[key].value) }}
                          disableRipple
                          clickable
                        />
                      }
                      </Grid>
                    ))}
                  </Grid>
                  <Box mt={4}>
                    <form onSubmit={handleTagSubmit} autoComplete="off">
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
                    </form>
                  </Box>
                </Box>
                <Box />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </Modal>
  );
};

export default EditTagsModal;

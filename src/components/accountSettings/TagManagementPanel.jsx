import React from 'react';
import {
  Box,
  Grid,
  Divider,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import UserServices from 'services/UserServices';
import PanelModule from 'components/organizers/PanelModule';
import {
  getAllUserTags,
  insertTag,
  updateTag,
  deleteTag,
} from 'services/TagsServices';
import TagInput from './TagInput';
import TagCreateInput from './TagCreateInput';

const TITLE = 'Manage Habit Tags';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const TagManagementPanel = () => {
  const {
    data, isPending, error, setData,
  } = useAsync(getAllUserTags);
  const dispatchAlert = useAlertSystemDispatch();

  const handleInsert = async (tag) => {
    try {
      const newTag = await insertTag({ tag });
      setData([...data, newTag]);
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  const handleUpdate = async (id, value) => {
    try {
      const updatedTag = await updateTag({ _id: id, tag: value });
      const updatedData = [...data];
      const index = updatedData.findIndex((tag) => tag._id === updatedTag._id);
      if (index !== -1) {
        updatedData[index] = updatedTag;
        setData(updatedData);
      }
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTag(id);
      setData(data.filter((tag) => tag._id !== id));
    } catch (e) {
      dispatchAlert({
        type: 'WARNING',
        message: e.message,
      });
    }
  };

  // const handleUpdate = async (tag = undefined, newTag = undefined) => {
  //   try {
  //     if (!tag && !newTag) {
  //       return;
  //     }

  //     let modifiedTags = tags;
  //     if (tag && newTag && tag !== newTag) {
  //       modifiedTags = modifiedTags.filter((t) => t !== tag);
  //       modifiedTags.push(newTag.toLowerCase());
  //     } else if (tag && !newTag) {
  //       modifiedTags = modifiedTags.filter((t) => t !== tag);
  //     } else if (!tag && newTag) {
  //       if (tags.includes(newTag)) {
  //         throw new Error(`Tag already exists: ${newTag}`)
  //       }
  //       modifiedTags.push(newTag.toLowerCase());
  //     } else {
  //       return;
  //     }

  //     const updatedData = await UserServices.insertUserTags(modifiedTags);
  //     setData(updatedData);
  //   } catch (e) {
  //     dispatchAlert({
  //       type: 'WARNING',
  //       message: e.message,
  //     });
  //   }
  // };

  if (isPending) {
    return (
      <PanelWrapper>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }

  if (error) {
    return (
      <PanelWrapper>
        <Typography color="error">{error.message}</Typography>
      </PanelWrapper>
    );
  }

  if (data) {
    return (
      <PanelWrapper>
        <Box mb={2}>
          <TagCreateInput handleInsert={handleInsert} />
        </Box>
        <Divider />
        <Box mt={2}>
          <Grid container spacing={2}>
            {
              data.map((tag) => (
                <Grid key={tag._id} item xs={12} sm={6}>
                  <TagInput tag={tag} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <Box mb={2}>
        <TagCreateInput handleUpdate={handleUpdate} />
      </Box>
    </PanelWrapper>
  );
};

export default TagManagementPanel;

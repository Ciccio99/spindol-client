import React from 'react';
import {
  Box,
  Grid,
  Divider,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import PanelModule from 'components/common/PanelModule';
import {
  getAllUserTags,
  insertTag,
  updateTag,
  deleteTag,
} from 'services/TagsServices';
import { Event } from 'utils/Tracking';
import TagInput from './TagInput';
import TagCreateInput from './TagCreateInput';

const TITLE = 'Manage Activities';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>{children}</PanelModule>
);

const getAvailableTags = async () => {
  const userTags = await getAllUserTags();
  userTags.sort((a, b) =>
    a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1
  );

  return userTags;
};

const TagManagementPanel = () => {
  const { data, isPending, error, setData } = useAsync(getAvailableTags);
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
    Event('Account', 'Update Custom Tag', `${value}`);
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
    Event('Account', 'Delete Custom Tag');
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
        <Box mt={2} pb={2}>
          <Typography variant="h6" gutterBottom>
            Sleep Tags
          </Typography>
          <Grid container spacing={2}>
            {data
              .filter((tag) => tag.sleepTrial)
              .map((tag) => (
                <Grid key={tag._id} item xs={12} sm={6}>
                  <TagInput
                    tag={tag}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Divider />
        <Box my={2}>
          <Typography variant="h6" gutterBottom>
            Activity Tags
          </Typography>
          <Grid container spacing={2}>
            {data
              .filter((tag) => !tag.sleepTrial)
              .map((tag) => (
                <Grid key={tag._id} item xs={12} sm={6}>
                  <TagInput
                    tag={tag}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
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

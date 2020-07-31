import React from 'react';
import {
  Box,
  Grid,
  Divider,
} from '@material-ui/core';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import UserServices from 'services/UserServices';
import PanelModule from 'components/organizers/PanelModule';
import TagInput from './TagInput';
import TagCreateInput from './TagCreateInput';

const TITLE = 'Manage Habit Tags';

const TabManagementPanel = () => {
  const user = useUserState();
  const dispatchUser = useUserDispatch();
  const dispatchAlert = useAlertSystemDispatch();
  const tags = user.settings?.tags.sort() || [];

  const handleUpdate = async (tag = undefined, newTag = undefined) => {
    try {
      if (!tag && !newTag) {
        return;
      }

      let modifiedTags = tags;
      if (tag && newTag && tag !== newTag) {
        modifiedTags = modifiedTags.filter((t) => t !== tag);
        modifiedTags.push(newTag.toLowerCase());
      } else if (tag && !newTag) {
        modifiedTags = modifiedTags.filter((t) => t !== tag);
      } else if (!tag && newTag) {
        if (tags.includes(newTag)) {
          throw new Error(`Tag already exists: ${newTag}`)
        }
        modifiedTags.push(newTag.toLowerCase());
      } else {
        return;
      }

      const data = await UserServices.insertUserTags(modifiedTags);
      const updatedUser = user;
      updatedUser.settings.tags = data;
      dispatchUser({
        type: 'USER_UPDATE',
        user: updatedUser,
      });
    } catch (error) {
      dispatchAlert({
        type: 'WARNING',
        message: error.message,
      });
    }
  };

  return (
    <PanelModule title={TITLE}>
      <Box mb={2}>
        <TagCreateInput handleUpdate={handleUpdate} />
      </Box>
      <Divider />
      <Box mt={2}>
        <Grid container spacing={2}>
          {
            tags.map((tag) => (
              <Grid key={tag} item xs={12} sm={6}>
                <TagInput tag={tag} handleUpdate={handleUpdate} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </PanelModule>
  );
};

export default TabManagementPanel;

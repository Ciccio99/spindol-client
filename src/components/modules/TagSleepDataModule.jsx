import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { useUserState } from 'context/userContext';
import defaultTags from 'constants/defaultTags';
import PanelModule from 'components/organizers/PanelModule';
import SelectInput from 'components/SelectInput';
import TagSleepTable from 'components/chart/TagSleepTable';
import useMobile from 'hooks/useMobile';

const TITLE = 'Tags & Sleep';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const getAvailableTags = (customTags = []) => {
  const tagSet = Array.from(new Set(defaultTags.concat(customTags)));
  tagSet.sort();
  return tagSet;
};

const TagSelector = ({ handleUpdate }) => {
  const { isMobile } = useMobile();
  const label = 'Select a Tag'
  const user = useUserState();
  const tagsList = getAvailableTags(user.settings?.tags || []);
  const [selectedTag, setSelectedTag] = useState(tagsList[0]);

  useEffect(() => {
    handleUpdate(selectedTag);
  }, [selectedTag, handleUpdate])

  const handleChange = (e) => {
    setSelectedTag(e.target.value);
  }

  return (
    <Box>
      <FormControl variant="outlined" color="secondary" size={isMobile ? 'small' : 'medium'} fullWidth>
      <InputLabel htmlFor="tagSelect">{label}</InputLabel>
      <SelectInput
        labelId="tagSelect"
        value={selectedTag}
        label={label}
        onChange={handleChange}
      >
        {
          tagsList.map((tag) => (<MenuItem key={tag} value={tag}>{tag}</MenuItem>))
        }
      </SelectInput>
      </FormControl>
    </Box>
  );
};

const TagSleepDataModule = ({ startDate, endDate }) => {
  const [selectedTag, setSelectedTag] = useState(undefined);

  return (
    <PanelWrapper>
      <TagSelector handleUpdate={setSelectedTag} />
      <Box mt={6}>
        <TagSleepTable startDate={startDate} endDate={endDate} tag={selectedTag} />
      </Box>
    </PanelWrapper>
  );
};



export default TagSleepDataModule;

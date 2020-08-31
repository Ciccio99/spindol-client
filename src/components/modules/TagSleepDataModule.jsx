import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import { getAllUserTags } from 'services/TagsServices';
import PanelModule from 'components/organizers/PanelModule';
import SelectInput from 'components/SelectInput';
import TagSleepTable from 'components/chart/TagSleepTable';
import useMobile from 'hooks/useMobile';
import { Event } from 'utils/Tracking';

const TITLE = 'Tags & Sleep';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const getAvailableTags = async () => {
  const userTags = await getAllUserTags();
  userTags.sort((a, b) => (a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1));
  return userTags;
};

const TagSelector = ({ handleUpdate }) => {
  const { data, error } = useAsync(getAvailableTags);
  const { isMobile } = useMobile();
  const label = 'Select a Tag';
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    handleUpdate(selectedTag);
  }, [selectedTag, handleUpdate]);

  const handleChange = (e) => {
    Event('Data View', 'Selected Tag', `${e.target.value}`);
    setSelectedTag(e.target.value);
  };

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
            data
              ? data.map((tag) => (<MenuItem key={tag._id} value={tag}>{tag.tag}</MenuItem>))
              : []
          }
        </SelectInput>
      </FormControl>
      { error && <Typography variant="caption" color="error">Something went wrong, your activity tags could not be loaded.</Typography>}
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

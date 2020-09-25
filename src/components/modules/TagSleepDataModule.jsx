import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TagSelector = ({ handleUpdate, noneLabel, disabled }) => {
  const classes = useStyles();
  const { data, error } = useAsync(getAvailableTags);
  const { isMobile } = useMobile();
  const [selectedTag, setSelectedTag] = useState('');
  const label = 'Select a Tag';

  useEffect(() => {
    handleUpdate(selectedTag);
  }, [selectedTag, handleUpdate]);

  const handleChange = (e) => {
    Event('Data View', 'Selected Tag', `${e.target.value}`);
    setSelectedTag(e.target.value);
  };

  return (
    <>
      <FormControl variant="outlined" color="secondary" className={classes.formControl} size={isMobile ? 'small' : 'medium'}>
        <InputLabel htmlFor="tagSelect">{label}</InputLabel>
        <SelectInput
          labelId="tagSelect"
          value={selectedTag}
          label={label}
          onChange={handleChange}
          disabled={disabled}
          fullWidth
        >
          <MenuItem value="">{noneLabel || 'None'}</MenuItem>
          {
            data
              ? data.map((tag) => (<MenuItem key={tag._id} value={tag}>{tag.tag}</MenuItem>))
              : []
          }
        </SelectInput>
      </FormControl>
      { error && <Typography variant="caption" color="error">Something went wrong, your activity tags could not be loaded.</Typography>}
    </>
  );
};

const TagSleepDataModule = ({ startDate, endDate }) => {
  const [selectedTag1, setSelectedTag1] = useState(undefined);
  const [selectedTag2, setSelectedTag2] = useState(undefined);

  return (
    <PanelWrapper>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
        <TagSelector handleUpdate={setSelectedTag1} />
        {
          selectedTag1 && <TagSelector handleUpdate={setSelectedTag2} noneLabel="Baseline" disabled={!selectedTag1} />
        }
      </Box>
      <Box mt={4}>
        <TagSleepTable startDate={startDate} endDate={endDate} tag1={selectedTag1} tag2={selectedTag2} />
      </Box>
    </PanelWrapper>
  );
};


export default TagSleepDataModule;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAsync } from 'react-async';
import useMobile from 'hooks/useMobile';
import SelectInput from 'components/SelectInput';
import { Event } from 'utils/Tracking';
import { getAllUserTags } from 'services/TagsServices';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  select1: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  select2: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
      borderWidth: '2px',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const getAvailableTags = async () => {
  const userTags = await getAllUserTags();
  userTags.sort((a, b) => (a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1));
  return userTags;
};

const TagComparisonSelectors = ({ handleTag1Change, handleTag2Change }) => {
  const { isMobile } = useMobile();
  const classes = useStyles();
  const { data, error } = useAsync(getAvailableTags);
  const [selectedTag1, setSelectedTag1] = useState('');
  const [selectedTag2, setSelectedTag2] = useState('');

  const label = 'Select a Tag';

  useEffect(() => {
    handleTag1Change(selectedTag1);
  }, [selectedTag1, handleTag1Change]);

  useEffect(() => {
    handleTag2Change(selectedTag2);
  }, [selectedTag2, handleTag2Change]);

  const handleChange1 = (e) => {
    Event('Data View', 'Selected Tag', `${e.target.value}`);
    setSelectedTag1(e.target.value);
  };

  const handleChange2 = (e) => {
    Event('Data View', 'Selected Comparative Tag', `${e.target.value}`);
    setSelectedTag2(e.target.value);
  };

  return (
    <Box width={isMobile ? '100%' : 'auto'}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm="auto">
          <FormControl variant="outlined" fullWidth color="primary" className={classes.formControl} size="small">
            <InputLabel htmlFor="tagSelect">{label}</InputLabel>
            <SelectInput
              labelId="tagSelect"
              value={selectedTag1}
              label={label}
              onChange={handleChange1}
              fullWidth
              className={classes.select1}
            >
              <MenuItem value="">None</MenuItem>
              {
                data
                  ? data.map((tag) => (<MenuItem key={tag._id} value={tag}>{tag.tag}</MenuItem>))
                  : []
              }
            </SelectInput>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography variant="subtitle2" color="textSecondary" align="center">v.s.</Typography>
        </Grid>
        <Grid item xs={12} sm="auto">
          <FormControl disabled={!selectedTag1} variant="outlined" fullWidth color="secondary" className={classes.formControl} size="small">
            <InputLabel htmlFor="tagSelect">{label}</InputLabel>
            <SelectInput
              labelId="tagSelect"
              value={selectedTag2}
              label={label}
              onChange={handleChange2}
              fullWidth
              className={classes.select2}
            >
              <MenuItem value="">Baseline</MenuItem>
              {
                data
                  ? data.map((tag) => (<MenuItem key={tag._id} value={tag}>{tag.tag}</MenuItem>))
                  : []
              }
            </SelectInput>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          { error && <Typography variant="caption" color="error">Something went wrong, your activity tags could not be loaded.</Typography>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TagComparisonSelectors;

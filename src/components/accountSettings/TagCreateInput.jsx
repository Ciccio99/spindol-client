import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Event } from 'utils/Tracking';

const TagCreateInput = ({ handleInsert }) => {
  const [tagInput, setTagInput] = useState('');

  const handleTagCreate = async (e) => {
    Event('Account', 'Create Custom Tag', `${tagInput}`);
    e.preventDefault();
    handleInsert(tagInput);
    setTagInput('');
  };

  return (
    <Box component="form" onSubmit={handleTagCreate}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item xs={12} sm={8}>
          <TextField
            value={tagInput}
            name="tag"
            type="text"
            placeholder="New Tag"
            label="New Tag"
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ maxLength: 40 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            disabled={!tagInput}
            type="submit"
            color="secondary"
            variant="contained"
            disableElevation
            size="large"
            startIcon={<AddIcon />}
            fullWidth
          >
            <Typography variant="body2">Add Tag</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TagCreateInput;

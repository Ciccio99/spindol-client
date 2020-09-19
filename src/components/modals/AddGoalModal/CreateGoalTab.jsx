import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CreateGoalTab = ({ createGoalHandle }) => {
  const [tagInput, setTagInput] = useState('');

  const handleTagCreate = async (e) => {
    e.preventDefault();
    createGoalHandle(tagInput);
    setTagInput('');
  };

  return (
    <Box component="form" onSubmit={handleTagCreate} width="100%" p={2}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item xs={12} sm={8}>
          <TextField
            value={tagInput}
            name="tag"
            type="text"
            placeholder="New Goal"
            label="New Goal"
            onChange={(e) => { setTagInput(e.target.value); }}
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button disabled={!tagInput} type="submit" color="secondary" variant="contained" disableElevation size="large" startIcon={<AddIcon />} fullWidth>
            <Typography variant="body2">Create Goal</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateGoalTab;

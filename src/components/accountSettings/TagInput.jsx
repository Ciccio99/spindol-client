import React, { useState } from 'react';
import {
  Grid,
  TextField,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const TagInput = ({ tag, handleUpdate }) => {
  const [tagInput, setTagInput] = useState(tag);

  return (
    <Grid container justify="space-between" alignItems="center" spacing={2} wrap="nowrap">
      <Grid item xs={10}>
        <TextField
          value={tagInput}
          name="tag"
          type="text"
          placeholder={tag}
          onChange={(e) => { setTagInput(e.target.value.toLowerCase()); }}
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        {
        tag !== tagInput
          ? (
            <CheckIcon onClick={() => { handleUpdate(tag, tagInput); }} style={{ cursor: 'pointer', color: '#8FEF9B' }} fontSize="default" />
          )
          : (
            <DeleteOutlineIcon onClick={() => { handleUpdate(tag); }} variant="contained" style={{ cursor: 'pointer' }} color="error" />
          )
      }
      </Grid>
    </Grid>
  );
};

export default TagInput;

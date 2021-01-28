import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Slide,
  Box,
  Modal,
  Button,
  Paper,
  Divider,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const TagInput = ({ tag, handleUpdate, handleDelete }) => {
  const [tagInput, setTagInput] = useState(tag.tag);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
      >
        <Grid item xs={10}>
          <TextField
            value={tagInput}
            name="tag"
            type="text"
            placeholder={tag.tag}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          {tag.tag !== tagInput ? (
            <CheckIcon
              onClick={() => {
                handleUpdate(tag._id, tagInput);
              }}
              style={{ cursor: 'pointer', color: '#8FEF9B' }}
              fontSize="default"
            />
          ) : (
            <DeleteOutlineIcon
              onClick={() => {
                setIsOpenDeleteModal(true);
              }}
              variant="contained"
              style={{ cursor: 'pointer' }}
              color="error"
            />
          )}
        </Grid>
      </Grid>
      <ConfirmDeleteTagModal
        open={isOpenDeleteModal}
        tagValue={tag.tag}
        handleDelete={() => {
          handleDelete(tag._id);
          setIsOpenDeleteModal(false);
        }}
        handleModalClose={() => {
          setIsOpenDeleteModal(false);
        }}
      />
    </>
  );
};

const ConfirmDeleteTagModal = ({
  tagValue,
  open,
  handleDelete,
  handleModalClose,
}) => (
  <Modal
    open={open}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    closeAfterTransition
    disableAutoFocus
    disableEnforceFocus
    disableRestoreFocus
  >
    <Slide direction="up" in={open}>
      <Box
        m={1}
        display="flex"
        justifyContent="center"
        maxWidth="600px"
        style={{ outline: 0 }}
      >
        <Paper>
          <Box p={4} display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
            >{`Are you sure you want to delete your "${tagValue}" tag?`}</Typography>
            <Typography variant="caption" color="error" align="center">
              <strong>
                Deleting this tag will also remove the tag from any Daily
                Diaries you applied it on.
              </strong>
            </Typography>
            <Divider />
            <Box mt={4} width="100%">
              <Grid container justify="space-around" spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={handleModalClose}
                    color="primary"
                    fullWidth
                    variant="contained"
                  >
                    No, Don't Delete
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={handleDelete}
                    color="secondary"
                    fullWidth
                    variant="contained"
                  >
                    Yes, Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Slide>
  </Modal>
);

export default TagInput;

import React, { useState }from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import EditTagsModal from 'components/modals/EditTagsModal';
import useMobile from 'hooks/useMobile';

const DayTagsSubModule = ({ tags, handleUpdate }) => {
  const { isMobile } = useMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedTags = tags?.sort() || [];

  const handleTagsUpdate = React.useCallback((selectedTags) => {
    const dto = { tags: selectedTags };
    handleUpdate(dto);
  }, [handleUpdate]);



  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2"><strong>What else did you do today?</strong></Typography>
        {
          isMobile
          ? (
              <EditTwoToneIcon onClick={() => { setIsModalOpen(true); }} style={{ cursor: 'pointer' }} color="secondary" />
          )
          : (
            <Button size="small" variant="contained" color="secondary" startIcon={<EditTwoToneIcon />}
              onClick={() => { setIsModalOpen(true); }}
            >
              <Typography variant="caption">Edit Tags</Typography>
            </Button>
          )
        }

      </Box>
      <Box mt={4}>
        {tags && tags.length > 0
        ? (<Grid container alignItems="center" spacing={3}>
          {sortedTags.map((tag) => (
            <Grid key={tag} item>
              <Chip label={tag} color="primary" />
            </Grid>
          ))}
        </Grid>)
        : <Typography variant="subtitle1">No activity tags selected...</Typography>
        }
      </Box>
      <EditTagsModal open={isModalOpen} tags={sortedTags} handleModal={setIsModalOpen} handleSaveTags={handleTagsUpdate}/>
    </Box>
  );
};

export default DayTagsSubModule;

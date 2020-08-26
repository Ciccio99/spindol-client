import React, { useState }from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import EditTagsModal from 'components/modals/EditTagsModal';
import useMobile from 'hooks/useMobile';

const getDateSubtitle = (date) => {
  const now = moment();
  const givenDate = moment(date);
  if (now.isSame(givenDate, 'day')) {
    return 'What activities did you today?';
  }
  return `What activities did you do on ${givenDate.format('dddd DD, MMM YYYY')}?`;
};


const DayTagsSubModule = ({ tags, date, handleUpdate }) => {
  const { isMobile } = useMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedTags = tags?.sort() || [];

  const handleTagsUpdate = React.useCallback((selectedTags) => {
    const dto = { diaryTags: selectedTags.map((tag) => tag._id) };
    handleUpdate(dto);
  }, [handleUpdate]);



  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2"><strong>{getDateSubtitle(date)}</strong></Typography>
        {
          isMobile
          ? (
              <EditTwoToneIcon onClick={() => { setIsModalOpen(true); }} style={{ cursor: 'pointer' }} color="secondary" />
          )
          : (
            <Button size="small" variant="contained" color="secondary" startIcon={<EditTwoToneIcon />}
              onClick={() => { setIsModalOpen(true); }}
            >
              <Typography variant="caption">Add Activity</Typography>
            </Button>
          )
        }

      </Box>
      <Box mt={4}>
        {tags && tags.length > 0
        ? (<Grid container alignItems="center" spacing={3}>
          {tags.map((tag) => (
            <Grid key={tag._id} item>
              <Chip label={tag.tag} color="primary" />
            </Grid>
          ))}
        </Grid>)
        : <Typography variant="subtitle1">Track your day by adding tags!</Typography>
        }
      </Box>
      <EditTagsModal open={isModalOpen} currentTags={tags} handleModal={setIsModalOpen} handleSaveTags={handleTagsUpdate}/>
    </Box>
  );
};

export default DayTagsSubModule;

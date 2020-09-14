import React, { useState } from 'react';
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
import { DisplaySleepChip } from 'components/common/TagChips';
import useMobile from 'hooks/useMobile';
import { Event } from 'utils/Tracking';

const getDateSubtitle = (date, enableVariedDateText = false) => {
  const givenDate = moment(moment.utc(date).format('YYYY-MM-DD'));
  if (enableVariedDateText) {
    const now = moment();
    if (now.diff(givenDate, 'day') === 0) {
      return (
        <Box>
          <Typography variant="subtitle1" display="inline">
            {'What activities did you do on '}
          </Typography>
          <Typography variant="subtitle1" color="primary" display="inline">
            <strong>today</strong>
          </Typography>
          <Typography variant="subtitle1" display="inline">
            ?
          </Typography>
        </Box>
      );
    }

    if (now.diff(givenDate, 'day') === 1) {
      return (
        <Box>
          <Typography variant="subtitle1" display="inline">
            {'What activities did you do '}
          </Typography>
          <Typography variant="subtitle1" color="primary" display="inline">
            <strong>{`yesterday - ${givenDate.format('dddd, MMM DD')}`}</strong>
          </Typography>
          <Typography variant="subtitle1" display="inline">
            ?
          </Typography>
        </Box>
      );
    }
  }
  return (
    <Box>
      <Typography variant="subtitle1" display="inline">
        {'What activities did you do on '}
      </Typography>
      <Typography variant="subtitle1" color="primary" display="inline">
        <strong>{givenDate.format('dddd, MMM DD')}</strong>
      </Typography>
      <Typography variant="subtitle1" display="inline">
        ?
      </Typography>
    </Box>
  );
};

const DayTagsSubModule = ({
  tags, date, handleUpdate, enableVariedDateText,
}) => {
  const { isMobile } = useMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTagsUpdate = React.useCallback((selectedTags) => {
    Event('Daily Diary', 'Edited Activity Tags', `Set ${selectedTags.length} Tags`);
    handleUpdate(selectedTags);
  }, [handleUpdate]);


  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        {getDateSubtitle(date, enableVariedDateText)}
        {
          isMobile
            ? (
              <EditTwoToneIcon onClick={() => { setIsModalOpen(true); }} style={{ cursor: 'pointer' }} color="secondary" />
            )
            : (
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EditTwoToneIcon />}
                  onClick={() => { setIsModalOpen(true); }}
                >
                  <Typography variant="caption">Add Activity</Typography>
                </Button>
              </Box>
            )
        }

      </Box>
      <Box mt={2}>
        {tags && tags.length > 0
          ? (
            <Grid container alignItems="center" spacing={3}>
              {tags.map((tag) => (
                <Grid key={tag._id} item>
                  {
                    tag.sleepTrial
                      ? <DisplaySleepChip tag={tag} />
                      : <Chip label={tag.tag} color="primary" />
                  }
                </Grid>
              ))}
            </Grid>
          )
          : <Typography variant="subtitle2" color="textSecondary">See what impacts your sleep by adding activity tags!</Typography>}
      </Box>
      <EditTagsModal open={isModalOpen} currentTags={tags} handleModal={setIsModalOpen} handleSaveTags={handleTagsUpdate} />
    </Box>
  );
};

export default DayTagsSubModule;

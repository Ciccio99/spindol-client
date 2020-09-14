import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: COLORS.LIGHT_GRAY,
    },
    '&:active': {
      backgroundColor: COLORS.GRAY,
    },
  },
}));

const TagCard = ({ tag, selectHandle }) => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Box onClick={selectHandle} width="100%" px={2} py={1} display="flex" justifyContent="space-between" alignItems="center" classes={classes}>
        <Typography variant="subtitle1">{tag.tag}</Typography>
        <ArrowForwardIosIcon color="secondary" fontSize="small" />
      </Box>
    </>
  );
};

const ExistingActivitiesTab = ({ tags, createGoalHandle }) => tags
  .map((tag) => (<TagCard key={tag._id} tag={tag} selectHandle={() => { createGoalHandle(tag); }} />));

export default ExistingActivitiesTab;

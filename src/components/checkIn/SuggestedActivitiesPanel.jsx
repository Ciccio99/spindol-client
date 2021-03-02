import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCreateActivity } from 'hooks/useActivities';
import { useSleepTrials } from 'hooks/useSleepTrials';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';
import { Box, Typography } from '@material-ui/core';
import SidePanel from 'components/common/SidePanel';
import { CancelIcon } from 'components/common/Icons';
import SleepActivityPanel from 'components/checkIn/SleepActivityPanel';
import SuggestedActivityCard from 'components/checkIn/SuggestedActivityCard';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  accentText: {
    color: COLORS.RED,
  },
  cancelBtn: {
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.05)',
    },
  },
  sidePanel: {
    position: 'relative',
  },
  detailsContainerDesktop: {
    position: 'absolute',
    left: '100%',
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 90,
  },
  detailsContainerMobile: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 90,
  },
}));

export default function SuggestedActivitiesPanel({ onClose }) {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const { createActivity } = useCreateActivity();
  const { data, isLoading } = useSleepTrials();
  const [suggestions, setSuggestions] = useState(data || null);
  const [previewActivity, setPreviewActivity] = useState(null);

  const addSuggestedActivity = async (activity) => {
    const dto = {
      tag: activity.name,
      sleepTrial: activity._id,
    };
    createActivity(dto);
    onClose();
  };

  useEffect(() => {
    if (!isLoading && data) {
      setSuggestions(data);
    }
  }, [data, isLoading]);

  return (
    <SidePanel className={classes.sidePanel}>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={4}
        px={2}
      >
        <Box mr={1}>
          <Typography variant="subtitle1" className={classes.accentText}>
            Suggested Sleep Activities
          </Typography>
        </Box>
        <CancelIcon className={classes.cancelBtn} onClick={onClose} />
      </Box>

      <Box width="100%" height="100%" overflow="auto scroll">
        {suggestions !== null
          ? suggestions.map((activity) => (
              <SuggestedActivityCard
                key={activity._id}
                activity={activity}
                onAdd={() => {
                  addSuggestedActivity(activity);
                }}
                onClick={() => {
                  setPreviewActivity(activity);
                }}
              />
            ))
          : null}
      </Box>
      {previewActivity ? (
        <div
          className={clsx({
            [classes.detailsContainerDesktop]: !isMobile,
            [classes.detailsContainerMobile]: isMobile,
          })}
        >
          <SleepActivityPanel
            activity={previewActivity}
            onClose={() => {
              setPreviewActivity(null);
            }}
          />
        </div>
      ) : null}
    </SidePanel>
  );
}

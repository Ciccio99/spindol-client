import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import useMobile from 'hooks/useMobile';
import { useDailyDiary, useUpdateDailyDiary } from 'hooks/useDailyDiary';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import StepperButton from 'components/checkIn/StepperButton';
import COLORS from 'constants/colors';
import { MOODS, getMoodSvg } from 'constants/mood';

const useStyles = makeStyles(() => ({
  moodCard: {
    maxWidth: 320,
    minWidth: '100%',
    cursor: 'pointer',
    transition: 'all 0.25s ease-in-out',
  },
  moodCardSelected: {
    background: COLORS.RED,
  },
  moodText: {
    color: COLORS.DARK_BLUE,
    textTransform: 'capitalize',
  },
  moodTextSelect: {
    color: COLORS.WHITE,
  },
  moodImg: {
    maxWidth: '28vw',
  },
  accentText: {
    color: COLORS.RED,
  },
  desktopStepper: {
    position: 'absolute',
    right: 100,
    bottom: 30,
  },
  mobileStepper: {
    width: '35vw',
  },
}));

const MoodCard = ({ mood, selected, onSelect, isSmall = false }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={24}
      onClick={onSelect}
      className={clsx(classes.moodCard, {
        [classes.moodCardSelected]: selected,
      })}
    >
      {isSmall ? (
        <Box p={2} width="100%">
          <Typography
            className={clsx(classes.moodText, {
              [classes.moodTextSelect]: selected,
            })}
            variant="subtitle1"
          >
            {mood}
          </Typography>
        </Box>
      ) : (
        <Box px={3} p={4} width="100%">
          <Typography
            className={clsx(classes.moodText, {
              [classes.moodTextSelect]: selected,
            })}
            variant="subtitle1"
          >
            {mood}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

const MoodPanelDesktop = ({ mood, onSelect, onNext, date, isNextDisabled }) => {
  const classes = useStyles();

  return (
    <>
      <Box
        width="100%"
        height="100vh"
        mt="-48px"
        px={2}
        pb={3}
        pt={10}
        display="flex"
      >
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box width="100%" pt={4} pb={2} px={2}>
            <Box maxWidth={245}>
              <Typography
                className={classes.accentText}
                variant="h4"
                gutterBottom
              >
                {moment(date).format('MMM DD')}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                How’d you feel waking up this morning?
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {Object.keys(MOODS).map((moodKey) => (
              <Grid item key={moodKey} xs={6} sm={12}>
                <MoodCard
                  mood={MOODS[moodKey]}
                  selected={MOODS[moodKey] === mood}
                  onSelect={() => onSelect(MOODS[moodKey])}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <img
            src={getMoodSvg(mood || MOODS.EXCELLENT)}
            alt={mood}
            className={classes.moodImg}
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <StepperButton
        className={classes.desktopStepper}
        onClick={onNext}
        isDisabled={isNextDisabled}
      />
    </>
  );
};

const MoodPanelMobile = ({ mood, onSelect, onNext, date, isNextDisabled }) => {
  const classes = useStyles();

  return (
    <Box
      width="100%"
      height="100vh"
      mt="-48px"
      px={2}
      pb={3}
      pt={10}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        width="100%"
        mt={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={getMoodSvg(mood || MOODS.EXCELLENT)}
          alt={mood}
          width={180}
          height={180}
        />
      </Box>
      <div>
        <Box mt={4} mb={3} maxWidth={245}>
          <Typography className={classes.accentText} variant="h4" gutterBottom>
            {moment(date).format('MMM DD')}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            How’d you feel waking <br /> up this morning?
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.keys(MOODS).map((moodKey) => (
            <Grid item key={moodKey} xs={6}>
              <MoodCard
                mood={MOODS[moodKey]}
                selected={MOODS[moodKey] === mood}
                onSelect={() => onSelect(MOODS[moodKey])}
                isSmall
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box my={4} display="flex" justifyContent="flex-end">
        <StepperButton
          className={classes.mobileStepper}
          onClick={onNext}
          isDisabled={isNextDisabled}
        />
      </Box>
    </Box>
  );
};

export default function MoodPanel({ navigation, date }) {
  const { isMobile } = useMobile();
  const { next } = navigation;
  const { data, isLoading } = useDailyDiary(date);
  const { updateDailyDiary } = useUpdateDailyDiary();
  const [moodState, setMoodState] = useState(data?.mood || null);
  const isNextDisabled = isLoading || !data || !moodState;

  useEffect(() => {
    if (!isLoading && data?.mood?.length > 0) {
      setMoodState(data.mood);
    }
  }, [data, isLoading]);

  const onSelectHandle = (selectedMood) => {
    setMoodState(selectedMood);
  };

  const onNextHandle = () => {
    const newData = {
      _id: data._id,
      mood: moodState,
    };
    updateDailyDiary({ data: newData, date });
    next();
  };

  return isMobile ? (
    <MoodPanelMobile
      onSelect={onSelectHandle}
      onNext={onNextHandle}
      mood={moodState}
      isNextDisabled={isNextDisabled}
      date={date}
    />
  ) : (
    <MoodPanelDesktop
      onSelect={onSelectHandle}
      onNext={onNextHandle}
      mood={moodState}
      isNextDisabled={isNextDisabled}
      date={date}
    />
  );
}

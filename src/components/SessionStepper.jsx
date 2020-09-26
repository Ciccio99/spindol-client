import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from '@material-ui/core';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import MoodRoundedIcon from '@material-ui/icons/MoodRounded';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import Confetti from 'react-confetti';
import { useSessionProgressState, useSessionProgressDispatch } from 'context/sessionProgressContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import COLORS from 'constants/colors';
import UserServices from 'services/UserServices';
import { StreakBox, HighStreakBox } from 'components/Streaks';
import useMobile from 'hooks/useMobile';
import { Event } from 'utils/Tracking';

const sessionSteps = ['Sign In', 'Add Mood', 'Add Tags'];

const confettiConfig = {
  recycle: false,
  numberOfPieces: 1000,
  gravity: 0.07,
  tweenDuration: 20000,
  colors: [COLORS.HYPNOS_BLUE, COLORS.HYPNOS_ORANGE, COLORS.HYPNOS_PURPLE, COLORS.HYPNOS_RED, COLORS.HYPNOS_YELLOW],
};

const CompleteConfetti = ({ active, handleOnComplete }) => {
  if (!active) {
    return null;
  }

  return (
    <Confetti run {...confettiConfig} onConfettiComplete={handleOnComplete} />
  );
};

const SessionStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      background: COLORS.GREEN,
    },
  },
  completed: {
    '& $line': {
      background: COLORS.GREEN,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useStepIconStyles = makeStyles(() => ({
  root: {
    backgroundColor: COLORS.GRAY,
    zIndex: 1,
    color: COLORS.WHITE,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    background: COLORS.GREEN,
  },
  completed: {
    background: COLORS.GREEN,
  },
}));

const SessionStepIcon = ({ active, completed, icon }) => {
  const classes = useStepIconStyles();
  const icons = {
    1: <VerifiedUserOutlinedIcon />,
    2: <MoodRoundedIcon />,
    3: <LocalOfferOutlinedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
};

const useStepperStyles = makeStyles(() => ({
  paperRoot: {
    backgroundColor: COLORS.BG_WHITE,
    padding: 0,
  },
}));

const useAnimationStyles = makeStyles((theme) => ({
  anim: {
    animation: `$grow 0.6s ${theme.transitions.easing.sharp}`,
  },
  '@keyframes grow': {
    '0%': { transform: 'scale(0)' },
    '70%': { transform: 'scale(1.15)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const SessionStepper = () => {
  const sessionProgressState = useSessionProgressState();
  const dispatchProgressSession = useSessionProgressDispatch();
  const dispatchAlert = useAlertSystemDispatch();
  const classes = useStepperStyles();
  const animClasses = useAnimationStyles();
  const { isMobile } = useMobile();
  const [activeStep] = useState(3);
  const [completed, setCompleted] = useState(new Set());
  const [confettiTime, setConfettiTime] = useState(false);

  const completeSession = React.useCallback(async (state) => {
    if (state.completed || !state.signIn || !state.mood || !state.tags) {
      return;
    }

    try {
      dispatchProgressSession({ type: 'SESSION_COMPLETE' });
      
      const dto = {};
      if (!state.stats.currentStreak) {
        dto.currentStreak = 1;
      } else if (moment().diff(moment(moment.utc(state.stats.lastUpdate).format('YYYY-MM-DD')), 'day') === 1) {
        dto.currentStreak = state.stats.currentStreak + 1;
      } else {
        dto.currentStreak = 1;
      }
      if (state.stats.highScore) {
        if (dto.currentStreak > state.stats.highScore) {
          dto.highScore = dto.currentStreak;
        } else {
          dto.highScore = state.stats.highScore;
        }
      } else {
        dto.highScore = dto.currentStreak;
      }

      dto.lastUpdate = moment().format('YYYY-MM-DD');

      const updatedStats = await UserServices.updateUserSessionProgress(dto);

      dispatchProgressSession({ type: 'UPDATE_STATS', value: updatedStats });
      setTimeout(() => { setConfettiTime(true); }, 500);
      Event('Daily Check-In', 'Check-In Complete');
      // TODO: Update user with new stats
    } catch (error) {
      dispatchAlert({
        type: 'WARNING',
        message: error.message,
      });
    }
  }, [dispatchProgressSession, setConfettiTime, dispatchAlert]);

  useEffect(() => {
    if (sessionProgressState.completed) {
      setCompleted(new Set([0, 1, 2]));
      return;
    }
    const compSet = new Set();
    if (sessionProgressState.signIn) {
      compSet.add(0);
    }
    if (sessionProgressState.mood) {
      compSet.add(1);
    }
    if (sessionProgressState.tags) {
      compSet.add(2);
    }
    setCompleted(compSet);
    (async () => {
      await completeSession(sessionProgressState);
    })();
  }, [sessionProgressState, completeSession]);


  const isStepComplete = (step) => completed.has(step);

  if (!sessionProgressState.initialized) {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <Grid container alignItems="center" spacing={4}>
          {
            sessionProgressState.completed
            && (
              <Grid item xs={12} className={animClasses.anim}>
                <Box px={4}>
                  <Typography variant="subtitle1">Great Job Today</Typography>
                  <Typography variant="caption">Check in tomorrow to keep up your streak!</Typography>
                  <Box mt={1}>
                    <Grid container justify="space-between" alignItems="center" spacing={3}>
                      <Grid item><StreakBox value={sessionProgressState.stats.currentStreak} /></Grid>
                      <Grid item><HighStreakBox value={sessionProgressState.stats.highScore} /></Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            )
            }
          <Grid item xs={12}>
            <Stepper nonLinear alternativeLabel activeStep={activeStep} connector={<SessionStepConnector />} className={classes.paperRoot}>
              {
                sessionSteps.map((label, index) => (
                  <Step
                    key={label}
                    completed={isStepComplete(index)}
                  >
                    <StepLabel StepIconComponent={SessionStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))
              }
            </Stepper>
          </Grid>
        </Grid>
        <CompleteConfetti active={confettiTime} handleOnComplete={() => { setConfettiTime(false); }} />
      </>
    );
  }

  return (
    <>
      <Grid container alignItems="center">
        {
          sessionProgressState.completed
          && (
            <Grid item xs={sessionProgressState.completed ? 4 : 0}>
              <Box pl={4} className={animClasses.anim}>
                <Typography variant="h6">Great Job Today</Typography>
                <Typography variant="caption">Check in tomorrow to keep up your streak!</Typography>
                <Box mt={1}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item><StreakBox value={sessionProgressState.stats.currentStreak} /></Grid>
                    <Grid item><HighStreakBox value={sessionProgressState.stats.highScore} /></Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          )
          }
        <Grid item xs={sessionProgressState.completed ? 8 : 12} className={animClasses.gridSizeTransition}>
          <Stepper nonLinear alternativeLabel activeStep={activeStep} connector={<SessionStepConnector />} className={classes.paperRoot}>
            {
              sessionSteps.map((label, index) => (
                <Step
                  key={label}
                  completed={isStepComplete(index)}
                >
                  <StepLabel StepIconComponent={SessionStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))
            }
          </Stepper>
        </Grid>
      </Grid>
      <CompleteConfetti active={confettiTime} handleOnComplete={() => { setConfettiTime(false); }} />
    </>
  );
};

export default SessionStepper;

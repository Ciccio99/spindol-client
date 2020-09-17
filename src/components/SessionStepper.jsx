import React, { useState, useEffect } from 'react';
import {
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

const useStepIconStyles = makeStyles((theme) => ({
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

const useStepperStyles = makeStyles((theme) => ({
  paperRoot: {
    backgroundColor: COLORS.BG_WHITE,
    padding: 0,
  },
}));


const SessionStepper = () => {
  const sessionProgressState = useSessionProgressState();
  const dispatchProgressSession = useSessionProgressDispatch();
  const dispatchAlert = useAlertSystemDispatch();
  const classes = useStepperStyles();
  const [activeStep, setActiveStep] = useState(3);
  const [completed, setCompleted] = useState(new Set());
  const [confettiTime, setConfettiTime] = useState(false);

  const completeSession = async (state) => {
    if (state.completed || !state.signIn || !state.mood || !state.tags) {
      return;
    }

    try {
      const dto = {};

      if (!state.stats.currentStreak) {
        dto.currentStreak = 1;
      } else if (moment().diff(moment.utc(state.stats.lastUpdate), 'days') === 1) {
        dto.currentStreak = state.stats.currentStreak + 1;
      } else {
        dto.currentStreak = 1;
      }

      if (state.stats.highScore) {
        if (dto.currentStreak > state.stats.highScore) {
          dto.highScore = dto.currentStreak;
        }
      } else {
        dto.highScore = dto.currentStreak;
      }

      dto.lastUpdate = moment().format('YYYY-MM-DD');

      await UserServices.updateUserSessionProgress(dto);
      dispatchProgressSession({ type: 'SESSION_COMPLETE' });
      setConfettiTime(true);
      // TODO: Notify user and confetti
      // TODO: Update user with new stats
    } catch (error) {
      dispatchAlert({
        type: 'WARNING',
        message: error.message,
      });
    }
  };

  useEffect(() => {
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
  }, [sessionProgressState]);


  const isStepComplete = (step) => completed.has(step);

  return (
    <>
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
      <CompleteConfetti active={confettiTime} handleOnComplete={() => { setConfettiTime(false); }} />
    </>
  );
};

export default SessionStepper;

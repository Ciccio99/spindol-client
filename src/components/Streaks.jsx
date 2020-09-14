import React from 'react';
import {
  Box, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import SentimentVeryDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentVeryDissatisfiedTwoTone';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';

const usePositiveStreakStyles = makeStyles(() => ({
  root: {
    border: `1px solid ${COLORS.GREEN}`,
    color: COLORS.GREEN,
    borderRadius: '5px',
  },
  typography: { color: COLORS.GREEN },
}));

const useNegativeStreakStyles = makeStyles(() => ({
  root: {
    border: `1px solid ${COLORS.PASTEL_RED}`,
    color: COLORS.PASTEL_RED,
    borderRadius: '5px',
  },
  typography: { color: COLORS.PASTEL_RED },
}));

const useHighStreakStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    borderRadius: '5px',
  },
}));

export const StreakBox = ({ value }) => {
  const { isMobile } = useMobile();
  if (isMobile) {
    return (
      value > 0
        ? <PositiveMobileStreakBox value={value} />
        : <NegativeMobileStreakBox value={value} />
    );
  }
  return (
    value > 0
      ? <PositiveStreakBox value={value} />
      : <NegativeStreakBox value={value} />
  );
};

export const PositiveStreakBox = ({ value }) => (
  <Box px={2} py={1} display="flex" justifyContent="center" alignItems="center" minWidth={180} classes={{ root: usePositiveStreakStyles().root }}>
    <Box mr={2} display="flex" justifyContent="center" alignItems="center">
      <WhatshotTwoToneIcon htmlColor={COLORS.ORANGE} fontSize="small" />
    </Box>
    <Typography variant="subtitle2" display="inline" align="center">
      <strong>{`${value} Day Streak`}</strong>
    </Typography>
  </Box>
);

export const NegativeStreakBox = ({ value }) => (
  <Box px={2} py={1} display="flex" justifyContent="center" alignItems="center" minWidth={180} classes={{ root: useNegativeStreakStyles().root }}>
    <Box mr={2} display="flex" justifyContent="center" alignItems="center">
      <SentimentVeryDissatisfiedTwoToneIcon htmlColor={COLORS.RED} fontSize="small" />
    </Box>
    <Typography variant="subtitle2" display="inline" align="center"><strong>{`${value} Day Streak`}</strong></Typography>
  </Box>
);

export const PositiveMobileStreakBox = ({ value }) => (
  <Box display="flex" alignItems="center">
    <Typography className={usePositiveStreakStyles().typography} variant="subtitle2" display="inline" align="center">
      <strong>{`Streak: ${value}`}</strong>
    </Typography>
    <Box ml={2} display="flex" justifyContent="center" alignItems="center">
      <WhatshotTwoToneIcon htmlColor={COLORS.ORANGE} fontSize="small" />
    </Box>
  </Box>
);

export const NegativeMobileStreakBox = ({ value }) => (
  <Box display="flex" alignItems="center">
    <Typography className={useNegativeStreakStyles().typography} variant="subtitle2" display="inline" align="center">
      <strong>{`Streak: ${value}`}</strong>
    </Typography>
    <Box ml={2} display="flex" justifyContent="center" alignItems="center">
      <SentimentVeryDissatisfiedTwoToneIcon htmlColor={COLORS.RED} fontSize="small" />
    </Box>
  </Box>
);



export const HighStreakBox = ({ value }) => (
  <Box py={1} display="inline" classes={useHighStreakStyles()}>
    <Typography variant="caption" display="inline" align="center">{`Longest Streak: ${value} ${value === 1 ? 'day' : 'days'}`}</Typography>
  </Box>
);

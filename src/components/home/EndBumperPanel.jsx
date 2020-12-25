import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMedium from 'hooks/useMedium';
import CtaButton from 'components/common/CtaButton';
import pinkBackground from 'assets/pink-background.png';

const useStyles = makeStyles(() => ({
  pinkBackground: {
    backgroundImage: `url(${pinkBackground})`,
    backgroundSize: 'cover',
  },
  text: {
    fontSize: '48px',
    maxWidth: 1120,
  },
  textMobile: {
    fontSize: '32px',
  },
}));

const EndBumperPanel = () => {
  const classes = useStyles();
  const { isMedium } = useMedium();
  return (
    <Box width="100%" py={12} px={4} className={classes.pinkBackground} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="overline" align="center" className={clsx(classes.text, { [classes.textMobile]: isMedium })}>
        Sleep is important and it’s very personal. We want to make sure people find what works best for them – help us help everyone get better sleep.
      </Typography>
      <Box mt={6} display="flex">
        <a
          href="https://www.kickstarter.com/projects/hypnos-sleep-journal/hypnos-a-sleep-journal-that-helps-you-get-better-sleep"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CtaButton text="Support Our Kickstarter" />
        </a>
      </Box>
    </Box>
  );
};

export default EndBumperPanel;

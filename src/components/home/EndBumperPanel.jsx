import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMedium from 'hooks/useMedium';
import CtaButton from 'components/common/CtaButton';
import ActiveBackground from 'components/common/ActiveBackground';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
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
    <ActiveBackground background={COLORS.DARK_PEACH} mobileScale={0.65} scale={1.2} translateX={-100} translateY={-200}>
      <Box width="100%" py={12} px={isMedium ? 3 : 4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
    </ActiveBackground>
  );
};

export default EndBumperPanel;

import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ActiveBackground from 'components/common/ActiveBackground';
import CtaButton from 'components/common/CtaButton';
import COLORS from 'constants/colors';
import useMedium from 'hooks/useMedium';

const useStyles = makeStyles(() => ({
  halfHorizontalPage: {
    minWidth: '50vw',
  },
  heroBackground: {
    background: COLORS.WHITE,
  },
  fullPageHeight: {
    minHeight: '100vh',
  },
}));

const HeroPanel = () => {
  const { isMedium } = useMedium();

  return isMedium ? <HeroPanelMobile /> : <HeroPanelDesktop />;
};

const HeroPanelDesktop = () => {
  const classes = useStyles();

  return (
    <Box display="flex" width="100vw" mt="-48px" className={clsx(classes.fullPageHeight, classes.heroBackground)}>
      <Box className={classes.halfHorizontalPage} px={5} display="flex" flexDirection="column" justifyContent="center">
        <Box maxWidth={560}>
          <div>
            <Typography variant="overline">
              A sleep journal
            </Typography>
            <Typography variant="overline">
              that helps you get
            </Typography>
            <Typography variant="overline">
              better sleep
            </Typography>
          </div>
          <Box mt={3}>
            <Typography variant="subtitle1" style={{ maxWidth: 'inherit', color: COLORS.BLACK }}>
              What matters most for a majority of people when it comes to sleep is their daily habits and activities. Hypnos helps extend beyond your average sleep tracker with useful, actionable insights
            </Typography>
          </Box>
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
      </Box>
      <Box className={clsx(classes.halfHorizontalPage, classes.peachBackground)}>
        <ActiveBackground background={COLORS.DARK_PEACH} translateX={-599} translateY={-100} />
      </Box>
    </Box>
  );
};

const HeroPanelMobile = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" width="100vw" className={clsx(classes.heroBackground)}>
      <Box px={2} pb={7} mt={5} display="flex" flexDirection="column">
        <Box maxWidth={560}>
          <div>
            <Typography variant="overline">
              A sleep journal
            </Typography>
            <Typography variant="overline">
              that helps you get
            </Typography>
            <Typography variant="overline">
              better sleep
            </Typography>
          </div>
          <Box mt={5}>
            <Typography variant="subtitle1" style={{ maxWidth: 'inherit', color: COLORS.BLACK }}>
              What matters most for a majority of people when it comes to sleep is their daily habits and activities. Hypnos helps extend beyond your average sleep tracker with useful, actionable insights
            </Typography>
          </Box>
          <Box mt={7} display="flex">
            <a
              href="https://www.kickstarter.com/projects/hypnos-sleep-journal/hypnos-a-sleep-journal-that-helps-you-get-better-sleep"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CtaButton text="Support Our Kickstarter" />
            </a>
          </Box>
        </Box>
      </Box>
      <Box height="22vh" className={clsx(classes.peachBackground)}>
        <ActiveBackground background={COLORS.DARK_PEACH} translateX={-599} translateY={-100} />
      </Box>
    </Box>
  );
};

export default HeroPanel;

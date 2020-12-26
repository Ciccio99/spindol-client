import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMedium from 'hooks/useMedium';
import COLORS from 'constants/colors';
import ActiveBackground from 'components/common/ActiveBackground';
import CtaButton from 'components/common/CtaButton';
import pencilIcon from 'assets/ic_pencil.svg';

const useStyles = makeStyles((theme) => ({
  halfHorizontalPage: {
    minWidth: '50vw',
  },
  heroBackground: {
    background: COLORS.WHITE,
  },
  fullPageHeight: {
    minHeight: '100vh',
  },
  pencilIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const HeroPanel = () => {
  const { isMedium } = useMedium();

  return isMedium ? <HeroPanelMobile /> : <HeroPanelDesktop />;
};

const HeroPanelDesktop = () => {
  const classes = useStyles();

  return (
    <Box display="flex" width="100vw" mt="-48px" className={classes.fullPageHeight}>
      <Box className={clsx(classes.halfHorizontalPage, classes.heroBackground)} px={5} display="flex" flexDirection="column" justifyContent="center">
        <Box maxWidth={560}>
          <Box maxWidth={460}>
            <Typography variant="overline">
              A sleep journal that helps you get better sleep
              <span><img width={32} height={32} src={pencilIcon} alt="Pencil Icon" className={classes.pencilIcon} /></span>
            </Typography>
          </Box>
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
        <ActiveBackground background={COLORS.DARK_PEACH} translateX={-525} translateY={-50} />
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
          <Box maxWidth={350}>
            <Typography variant="overline">
              A sleep journal that helps you get better sleep
              <span><img width={24} height={24} src={pencilIcon} alt="Pencil Icon" className={classes.pencilIcon} /></span>
            </Typography>
          </Box>
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
      <Box height="22vh" width="100%" className={clsx(classes.peachBackground)}>
        <ActiveBackground background={COLORS.DARK_PEACH} mobileScale={0.45} translateX={-800} translateY={-400} />
      </Box>
    </Box>
  );
};

export default HeroPanel;

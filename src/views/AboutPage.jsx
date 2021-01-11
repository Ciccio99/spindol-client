import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { makeStyles } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';
import ActiveBackground from 'components/common/ActiveBackground';
import hypnosTeam from 'assets/hypnos-team.jpeg';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  background: {
    background: COLORS.WHITE,
  },
  bodyText: {
    fontWeight: 300,
  },
  link: {
    fontWeight: 500,
    color: COLORS.DARK_BLUE,
    textDecoration: 'underline',
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  const { isMobile } = useMobile();

  return (
    <>
      <Helmet>
        <title>Hypnos - About</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use sleep data from sleep trackers to correlate how different sleep habits affect your sleep. Discover which sleep trial best improves your sleep and overall happiness."
        />
      </Helmet>
      <Box height="30vh" mt={isMobile ? 0 : '-48px'}>
        <ActiveBackground background={COLORS.DARK_PEACH} translateX={-150} translateY={-200} scale={1.2} mobileScale={0.7}>
          <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="overline" align="center">Who Made Hypnos?</Typography>
          </Box>
        </ActiveBackground>
      </Box>
      <Box className={classes.background} display="flex" justifyContent="center" px={4} py={8} width="100%">
        <Box maxWidth={800}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                Hypnos is comprised of a small team of researchers that have constantly fought to improve their own sleep while chasing innovation. Our first venture together was in University when we worked on indoor solar devices to recycle wasted energy. That semester was filled with late nights that often turned into early mornings. Soon enough, functioning on less sleep and more coffee became the norm.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                It wasn’t until a year after we had graduated and had been accepted into the world renowned
                {' '}
                <a className={classes.link} href="https://www.ycombinator.com/" target="_blank" rel="noopener noreferrer">YCombinator</a>
                {' '}
                for another business venture in chemical extraction that our sleep really demanded our attention. We were burning out, leading to mistakes we otherwise wouldn’t be making. The heart of our problem was sleep.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                We set out to learn everything we could. We poured through papers on sleep, attended coaching courses, learned how to read EEG’s and interpret the data. We even became sleep coaches for other entrepreneurs. Before we new it, we were knee deep in the issues of sleep.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                There’s a lot of information you need about a person, to make accurate or relevant suggestions. We knew that if we wanted to create a a widely accessible solution to restless sleep, we needed a method that we could tailor to an individual that would constantly adapt to their ever-changing lives. Not only that, but the design of such a software, really matters. Especially when our society is so accustom to the most convenient solutions.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                We’ve taken our experience and passion in the sleep industry to create Hypnos — a sleep journal that takes your sleep data and understands your context, to help you get better sleep.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                Hypnos wouldn’t have been possible without the support from our sleep coaching clients and our beta testers. We greatly appreciate all the help we’ve received throughout our journey thus far.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.bodyText}>
                <span role="img" aria-label="heart">❤️</span>
                {' '}
                Hypnos Squad
              </Typography>
            </Grid>
          </Grid>
          <Box mt={8} display="flex" justifyContent="center" width="100%">
            <img src={hypnosTeam} alt="Hypnos team in SF" width="90%" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;

import React from 'react';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import HeroPanel from 'components/home/HeroPanel';
import HowItWorksPanel from 'components/home/HowItWorksPanel';
import ComboInfoPanel from 'components/home/ComboInfoPanel';
import DetailsPanel from 'components/home/DetailsPanel';
import EndBumperPanel from 'components/home/EndBumperPanel';
import HomeBadge from 'components/home/HomeBadge';

const Home = () => (
  <Box width="100vw">
    <Helmet>
      <title>Spindol - Sleep Journal</title>
      <meta
        name="description"
        content="Hypnos.ai helps you track and improve your sleep habits. Use sleep data from sleep trackers to correlate how different sleep habits affect your sleep. Discover which sleep trial best improves your sleep and overall happiness."
      />
    </Helmet>
    <HomeBadge />
    <HeroPanel />
    <HowItWorksPanel />
    <ComboInfoPanel />
    <DetailsPanel />
    <EndBumperPanel />
  </Box>
);

export default Home;

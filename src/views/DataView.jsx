import React from 'react';
import { Container, Divider } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import Section from 'components/common/Section';
import DataExploreTabPanel from 'components/data/DataExploreTabPanel';

const DataView = () => (
  <Container>
    <Helmet>
      <title>Spindol - Data</title>
    </Helmet>
    <Divider />
    <Section>
      <DataExploreTabPanel />
    </Section>
  </Container>
);

export default DataView;

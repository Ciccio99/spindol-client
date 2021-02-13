import React, { useState } from 'react';
import { Box, Container, Divider, Tabs, Tab } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import Section from 'components/common/Section';
import TabPanel from 'components/tabPanel/TabPanel';
import DataExploreTabPanel from 'components/data/DataExploreTabPanel';

const DataView = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container>
      <Helmet>
        <title>Spindol - Data</title>
      </Helmet>
      <Box
        component={Tabs}
        value={tabValue}
        onChange={(e, newValue) => {
          setTabValue(newValue);
        }}
        variant="scrollable"
        scrollButtons="off"
        indicatorColor="primary"
        textColor="primary"
        mt={2}
      >
        <Tab label="Data Explore" disableRipple />
        {/* <Tab label="Trends" disableRipple />
        <Tab label="Trends of Yesteryear" disableRipple /> */}
      </Box>
      <Divider />
      <Section>
        <TabPanel value={tabValue} index={0}>
          <DataExploreTabPanel />
        </TabPanel>
        {/* <TabPanel value={tabValue} index={1}>
          Trends
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Trends History
        </TabPanel> */}
      </Section>
    </Container>
  );
};

export default DataView;
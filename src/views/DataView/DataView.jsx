import React, { useState } from 'react';
import {
  Box,
  Grid,
  Container,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import moment from 'moment-timezone';
import dateViews from 'constants/dateViews';
import ViewHeader from 'components/ViewHeader';
import Section from 'components/organizers/Section';
import TagSleepDataModule from 'components/modules/TagSleepDataModule';
import TagsHeatMapModule from 'components/modules/TagsHeatMapModule';
import DateRangePicker from 'views/DataView/DateRangePicker';
import TagComparisonSelectors from 'views/DataView/TagComparisonSelectors';

const DataView = () => {
  const [viewRange, setViewRange] = useState(dateViews.M);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.M),
    endDate: moment().endOf(dateViews.M),
    month: moment().format('MMMM'),
    year: moment().format('YYYY'),
  });
  const [selectedTag1, setSelectedTag1] = useState();
  const [selectedTag2, setSelectedTag2] = useState();

  return (
    <Container>
      <Helmet>
        <title>Hypnos.ai - Data</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Use the Data view to see information about your daily tags and sleep."
        />
      </Helmet>
      <ViewHeader label="Your Data" />
      <Box mt={4}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <DateRangePicker handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} />
          </Grid>
          <Grid item xs={12} sm="auto">
            <TagComparisonSelectors handleTag1Change={setSelectedTag1} handleTag2Change={setSelectedTag2} />
          </Grid>
        </Grid>
      </Box>
      <Section>
        <TagSleepDataModule startDate={viewDates.startDate} endDate={viewDates.endDate} tag1={selectedTag1} tag2={selectedTag2} />
      </Section>
      <Section>
        <TagsHeatMapModule startDate={viewDates.startDate} endDate={viewDates.endDate} viewRange={viewRange} />
      </Section>
    </Container>
  );
};

export default DataView;

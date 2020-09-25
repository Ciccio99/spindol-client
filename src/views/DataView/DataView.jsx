import React, { useState } from 'react';
import {
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

const DataView = () => {
  const [viewRange, setViewRange] = useState(dateViews.M);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.M),
    endDate: moment().endOf(dateViews.M),
    month: moment().format('MMMM'),
    year: moment().format('YYYY'),
  });

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
      <DateRangePicker handleDatesUpdate={setViewDates} handleRangeUpdate={setViewRange} />
      <Section>
        <TagSleepDataModule startDate={viewDates.startDate} endDate={viewDates.endDate} />
      </Section>
      <Section>
        <TagsHeatMapModule startDate={viewDates.startDate} endDate={viewDates.endDate} viewRange={viewRange} />
      </Section>
    </Container>
  );
};

export default DataView;

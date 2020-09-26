import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import TagSleepTable from 'components/chart/TagSleepTable';

const TITLE = 'Tags Sleep Impact';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const TagSleepDataModule = ({ startDate, endDate, tag1, tag2 }) => {
  if (!tag1) {
    return (
      <PanelWrapper>
        <Typography variant="subtitle1">Select a tag to view your data</Typography>
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <TagSleepTable startDate={startDate} endDate={endDate} tag1={tag1} tag2={tag2} />
    </PanelWrapper>
  );
};


export default TagSleepDataModule;

import React, { useState } from 'react';
import {
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Box,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './ExpansionPanel.module.css';

const ExpansionPanel = ({ summary, details }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <MuiExpansionPanel
      expanded={expanded}
      onChange={() => { setExpanded(!expanded); }}
      elevation={0}
      classes={{ root: styles.expansionPanelRoot }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Box mx={1}>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography variant="body1">{details}</Typography>
      </ExpansionPanelDetails>
    </MuiExpansionPanel>
  );
};

export default ExpansionPanel;

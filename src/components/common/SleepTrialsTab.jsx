import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Chip, Divider,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button,
  FormControl, InputLabel, Select, MenuItem, LinearProgress,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useAsync } from 'react-async';
import useMobile from 'hooks/useMobile';
import { getAllSleepTrials } from 'services/SleepTrialServices';
import COLORS from 'constants/colors';
import SLEEP_TRIAL_TYPE from 'constants/sleepTrialType';
import AREA_EFFECT from 'constants/areaEffect';

const useFilterStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: COLORS.BG_WHITE,
    '& .MuiButtonBase-root': {
      padding: `0 ${theme.spacing(3)}px`,
    },
  },

}));

const useExpansionStyles = makeStyles(() => ({
  rounded: {
    '&:last-child': {
      borderRadius: '15px',
    },
    '&:first-child': {
      borderRadius: '15px',
    },
  },
}));

const useChipStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  sizeSmall: {
    fontSize: theme.typography.pxToRem(12),
    height: '18px',
  },
}));

const useFormControlStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const FilterAccordion = ({ updateHandle }) => {
  const filterClasses = useFilterStyles();
  const formControlClasses = useFormControlStyles();
  const [expanded, setExpanded] = useState(false);
  const [sleepTrialType, setSleepTrialType] = useState('');
  const [areaEffect, setAreaEffect] = useState('');

  useEffect(() => {
    updateHandle({ sleepTrialType, areaEffect });
  }, [sleepTrialType, areaEffect, updateHandle]);

  return (
    <ExpansionPanel expanded={expanded} square onChange={() => { setExpanded(!expanded); }} classes={filterClasses} elevation={0}>
      <ExpansionPanelSummary expandIcon={<MoreVertIcon color="primary" fontSize="small" />} disableRipple>
        <Typography variant="subtitle2" color="primary"><strong>Filters</strong></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box width="100%" mt={-3} mb={2}>
          <FormControl classes={formControlClasses} color="secondary">
            <InputLabel>Sleep Trial Type</InputLabel>
            <Select
              value={sleepTrialType}
              onChange={(e) => { setSleepTrialType(e.target.value); }}
            >
              <MenuItem value="" disableRipple><em>All Types</em></MenuItem>
              {
                Object.values(SLEEP_TRIAL_TYPE)
                  .map((type) => (<MenuItem key={type} value={type} disableRipple>{type}</MenuItem>))
              }
            </Select>
          </FormControl>
          <Box width="100%" mt={1}>
            <FormControl classes={formControlClasses} color="secondary">
              <InputLabel>Area of Effect</InputLabel>
              <Select
                value={areaEffect}
                onChange={(e) => { setAreaEffect(e.target.value); }}
              >
                <MenuItem value="" disableRipple><em>Any Effect</em></MenuItem>
                {
                  Object.values(AREA_EFFECT)
                    .map((effect) => (<MenuItem key={effect} value={effect} disableRipple>{effect}</MenuItem>))
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const SleepDetailsAccordion = ({ sleepTrial }) => {

  const [expanded, setExpanded] = useState(false);
  const expansionClasses = useExpansionStyles();

  return (
    <ExpansionPanel expanded={expanded} elevation={1} onChange={() => { setExpanded(!expanded); }} classes={expansionClasses}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon fontSize="small" />} disableRipple>
        <Typography variant="subtitle2" color="textSecondary">{`${expanded ? 'Less' : 'More'} Details`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <Typography variant="caption">Directions:</Typography>
          <Typography variant="subtitle2" gutterBottom>{sleepTrial.directions}</Typography>
          <Typography variant="caption">Details:</Typography>
          <Typography variant="subtitle2">{sleepTrial.description}</Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useSleepTrialCardStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chipsContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  expansionContainer: {
    marginTop: theme.spacing(1),
  },
}));

const SleepTrialCard = ({ sleepTrial, selectHandle }) => {
  const chipClasses = useChipStyles();
  const classes = useSleepTrialCardStyles();

  return (
    <>
      <Divider />
      <div className={classes.outerContainer}>
        <div className={classes.headingContainer}>
          <Typography variant="subtitle1" color="textSecondary"><strong>{sleepTrial.name}</strong></Typography>
          <Button onClick={selectHandle} variant="contained" color="secondary" size="small" disableRipple>Select Sleep Tag</Button>
        </div>
        <Typography variant="subtitle2" color="textSecondary">{`${sleepTrial.type} Type`}</Typography>
        <div className={classes.chipsContainer}>
          {
            sleepTrial.areasOfEffect.map((effect) => (
              <Chip label={effect} key={effect} color="primary" variant="outlined" size="small" classes={{ root: chipClasses.root }} />
            ))
          }
        </div>
        <div className={classes.expansionContainer}>
          <SleepDetailsAccordion sleepTrial={sleepTrial} />
        </div>
      </div>
    </>
  );
};

const SleepTrialCardMobile = ({ sleepTrial, selectHandle }) => {
  const chipClasses = useChipStyles();
  return (
    <>
      <Divider />
      <Box mb={2} p={2}>
        <Typography variant="subtitle1" color="textSecondary"><strong>{sleepTrial.name}</strong></Typography>
        <Typography variant="subtitle2" color="textSecondary">{`${sleepTrial.type} Type`}</Typography>
        <Box mt={1} display="flex" alignItems="center" flexWrap="wrap">
          {
          sleepTrial.areasOfEffect.map((effect) => (
            <Chip label={effect} key={effect} color="primary" variant="outlined" size="small" classes={chipClasses} />
          ))
        }
        </Box>
        <Box mt={4}>
          <SleepDetailsAccordion sleepTrial={sleepTrial} />
        </Box>
        <Box width="100%" mt={2}>
          <Button onClick={selectHandle} variant="contained" color="secondary" fullWidth size="small" disableRipple>Select Sleep Tag</Button>
        </Box>
      </Box>
    </>
  );
};

const useSleepTrialsPageStyles = makeStyles(() => ({
  filterContainer: {
    width: '100%',
  },
}));

const SleepTrialsPage = ({ createTagHandle }) => {
  const { data, isPending, error } = useAsync(getAllSleepTrials);
  const classes = useSleepTrialsPageStyles();
  const [filters, setFilters] = useState({ sleepTrialType: '', areaEffect: '' });
  const [filteredTrials, setFilteredTrials] = useState([]);
  const { isMobile } = useMobile();
  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    const filtered = data.filter((sleepTrial) => {
      let type = true;
      let effect = true;
      if (filters.sleepTrialType) {
        type = sleepTrial.type === filters.sleepTrialType;
      }

      if (filters.areaEffect && sleepTrial.areasOfEffect.length) {
        effect = sleepTrial.areasOfEffect.includes(filters.areaEffect);
      }
      return type && effect;
    }).sort((a, b) => (a.name < b.name ? -1 : 1));

    setFilteredTrials(filtered);
  }, [data, filters]);

  if (isPending) {
    return (
      <LinearProgress color="secondary" />
    );
  }

  if (error) {
    return (
      <Typography variant="subtitle1" color={error}>{error.message}</Typography>
    );
  }

  return (
    <>
      <div className={classes.filterContainer}>
        <FilterAccordion updateHandle={setFilters} />
      </div>
      {
        isMobile
          ? filteredTrials.map((sleepTrial) => (<SleepTrialCardMobile key={sleepTrial._id} sleepTrial={sleepTrial} selectHandle={() => { createTagHandle(sleepTrial); }} />))
          : filteredTrials.map((sleepTrial) => (<SleepTrialCard key={sleepTrial._id} sleepTrial={sleepTrial} selectHandle={() => { createTagHandle(sleepTrial); }} />))
      }
    </>
  );
};

export default SleepTrialsPage;

import React, { useState } from 'react';
import {
  Switch,
  Container,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Helmet } from 'react-helmet-async';
import moment from 'moment-timezone';
import dateViews from 'constants/dateViews';
import ViewHeader from 'components/ViewHeader';
import useMedium from 'hooks/useMedium';
import Section from 'components/organizers/Section';
import TagSleepDataModule from 'components/modules/TagSleepDataModule';

const useStylesArrows = makeStyles((theme) => ({
  root: {
    fill: theme.palette.text.secondary,
    cursor: 'pointer',
  },
}));

const useStylesGridItem = makeStyles(() => ({
  item: {
    minWidth: '72px',
    textAlign: 'center',
  },
}));

const useStylesSwitch = makeStyles((theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const DataView = () => {
  const classesArrows = useStylesArrows();
  const classesGridItem = useStylesGridItem();
  const classesSwitch = useStylesSwitch();
  const [viewRange, setViewRange] = useState(dateViews.M);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.M),
    endDate: moment().endOf(dateViews.M),
    month: moment().format('MMMM'),
    year: moment().format('YYYY'),
  });

  const handleArrowClick = (step) => {
    setViewDates((prevState) => {
      const startDate = moment(prevState.startDate).add(step, viewRange).startOf(viewRange);
      const endDate = moment(startDate).endOf(viewRange);
      return {
        startDate,
        endDate,
        month: startDate.format('MMMM'),
        year: startDate.format('YYYY'),
      };
    });
  };

  const handleViewToggle = (event) => {
    const newDateView = event.target.checked ? dateViews.M : dateViews.W;
    setViewRange(newDateView);
    setViewDates((prevState) => {
      const startDate = moment(prevState.startDate).startOf(newDateView);
      const endDate = moment(startDate).endOf(newDateView);
      return {
        startDate,
        endDate,
        month: startDate.format('MMMM'),
        year: startDate.format('YYYY'),
      };
    });
  };

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
      <Box my={4}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={65}>
          <ArrowBackIosIcon onClick={() => { handleArrowClick(-1); }} classes={classesArrows} />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mx={3} minWidth={240}>
            <DateLabel viewDates={viewDates} viewRange={viewRange} />
          </Box>
          <ArrowForwardIosIcon onClick={() => { handleArrowClick(1); }} classes={classesArrows} />
        </Box>
        <Box mt={2}>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item classes={classesGridItem}>Weekly</Grid>
            <Grid item classes={classesGridItem}>
              <Switch checked={viewRange === dateViews.M} onChange={handleViewToggle} name="dateViewRange" disableRipple classes={classesSwitch} />
            </Grid>
            <Grid item classes={classesGridItem}>Monthly</Grid>
          </Grid>
        </Box>
      </Box>
      <Section>
        <TagSleepDataModule startDate={viewDates.startDate} endDate={viewDates.endDate} />
      </Section>
    </Container>
  );
};

const DateLabel = ({ viewDates, viewRange }) => {
  const { isMedium } = useMedium();


  if (viewRange === dateViews.M) {
    return (
      <>
        <Typography variant="h6">{`${viewDates.month} ${viewDates.year}`}</Typography>
        <Typography variant="subtitle2" color="textSecondary">{`${viewDates.startDate.format('ddd DD')} - ${viewDates.endDate.format('ddd DD')}`}</Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant={isMedium ? 'subtitle2' : 'h6'}>{`${viewDates.startDate.format('MMM DD, YYYY')} - ${viewDates.endDate.format('MMM DD, YYYY')}`}</Typography>
    </>
  );
};

export default DataView;

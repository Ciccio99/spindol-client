import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment-timezone';
import PanelModule from 'components/organizers/PanelModule';
import HabitServices from 'services/HabitServices';
import BedtimeHabitPanel from 'components/habits/BedtimeHabitPanel';
import WaketimeHabitPanel from 'components/habits/WaketimeHabitPanel';
import HabitHeatMap from 'components/chart/HabitHeatMap';
import dateViews from 'constants/dateViews';
import useMobile from 'hooks/useMobile';
import styles from './HabitModule.module.css';

const TITLE = 'Sleep Habit Tracker  ';
const SUBTITLE = 'Measure how often you achieve your bedtime & waketime habits.';

const HabitModule = () => {
  const { isMobile } = useMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [currDateView, setCurrDateView] = useState(isMobile ? dateViews.W : dateViews.M);
  // const [viewDates, setViewDates] = useState({
  //   startDate: moment().startOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'),
  //   endDate: moment().endOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'),
  //   month: moment().format('MMMM'),
  // });
  const [currDateView, setCurrDateView] = useState(dateViews.W);
  const [viewDates, setViewDates] = useState({
    startDate: moment().startOf(dateViews.W).format('YYYY-MM-DD'),
    endDate: moment().endOf(dateViews.W).format('YYYY-MM-DD'),
    month: moment().format('MMMM'),
  });
  const [bedtimeHabit, setBedtimeHabit] = useState();
  const [waketimeHabit, setWaketimeHabit] = useState();
  const [heatmapData, setHeatmapData] = useState();


  const handleBackClick = () => {
    setViewDates((prevState) => ({
      startDate: moment(prevState.startDate).subtract(1, currDateView).format('YYYY-MM-DD'),
      endDate: moment(prevState.endDate).subtract(1, currDateView).format('YYYY-MM-DD'),
      month: moment(prevState.startDate).subtract(1, currDateView).format('MMMM'),
    }));
  };

  const handleForwardClick = () => {
    setViewDates((prevState) => ({
      startDate: moment(prevState.startDate).add(1, currDateView).format('YYYY-MM-DD'),
      endDate: moment(prevState.endDate).add(1, currDateView).format('YYYY-MM-DD'),
      month: moment(prevState.startDate).add(1, currDateView).format('MMMM'),
    }));
  };

  // useEffect(() => {
  //   setViewDates((prevState) => ({
  //     startDate: moment().startOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'),
  //     endDate: moment().endOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'),
  //     month: prevState.month,
  //   }));
  //   setCurrDateView(isMobile ? dateViews.W : dateViews.M);
  // }, [isMobile]);

  useEffect(() => {
    (async () => {
      setIsUpdating(true);
      const { data, error } = await HabitServices
        .getDashboardData(viewDates.startDate, viewDates.endDate, currDateView);
      if (error) {
        setErrorMessage('Something went wrong, unable to load your habits...');
      } else {
        setBedtimeHabit(data.bedtime);
        setWaketimeHabit(data.waketime);
        setHeatmapData(data.heatmapData);
        setErrorMessage(false);
      }
      setIsUpdating(false);
      setIsLoading(false);
    })();
  }, [viewDates, currDateView]);

  if (isLoading) {
    return (
      <PanelModule title={TITLE} subtitle={SUBTITLE}>
        <LinearProgress color="secondary" />
      </PanelModule>
    );
  }

  if (errorMessage) {
    return (
      <PanelModule title={TITLE} subtitle={SUBTITLE}>
        <Typography variant="subtitle1">{errorMessage}</Typography>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={TITLE} subtitle={SUBTITLE}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ArrowBackIosIcon onClick={handleBackClick} fontSize="small" color="action" className={styles.navArrow} />
        <Typography variant="subtitle1" display="inline">{viewDates.month}</Typography>
        <ArrowForwardIosIcon onClick={handleForwardClick} fontSize="small" color="action" className={styles.navArrow} />
      </Box>
      <Box mt={0.5} height={2}>
        { isUpdating && <LinearProgress color="secondary" /> }
      </Box>
      <Box height={120} display="flex" justifyContent="space-between" alignItems="center">
        <HabitHeatMap
          data={heatmapData.data}
          auxData={heatmapData.auxData}
          keys={heatmapData.keys}
        />
      </Box>
      <Box mt={1}>
        <Typography variant="caption" align="center" display="block" gutterBottom>Time Δ From Goal:</Typography>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={6} sm="auto">
            <LegendBlock label="0-30 min" color="rgb(143, 239, 155)" />
          </Grid>
          <Grid item xs={6} sm="auto">
            <LegendBlock label="30-60 min" color="rgba(250,200,86,1)" />
          </Grid>
          <Grid item xs={6} sm="auto">
            <LegendBlock label="60-90 min" color="rgba(230,126,86,1)" />
          </Grid>
          <Grid item xs={6} sm="auto">
            <LegendBlock label="90+ min" color="rgba(218,80,87,1)" />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        {
          !bedtimeHabit
          && !waketimeHabit
          && (
            <Typography variant="subtitle2" gutterBottom>
              <span role="img" aria-label="warning" style={{ color: '#FAC856' }}>⚠️</span>
              {' You haven\'t set any sleep habit goals yet! Set your Bedtime & Waketime goals to track how consistent you are at maintaing your sleep habits.'}
            </Typography>
          )
        }
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box>
              <BedtimeHabitPanel habit={bedtimeHabit} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Box mt={2}>
              <WaketimeHabitPanel habit={waketimeHabit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PanelModule>
  );
};

const LegendBlock = ({ label, color }) => (
  <Box px={0.5} py={0.5} width={80} borderRadius={5} style={{ backgroundColor: color }}>
    <Typography variant="caption" align="center" display="block">
      {label}
    </Typography>
  </Box>
);

export default HabitModule;

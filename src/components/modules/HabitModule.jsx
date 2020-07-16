import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import moment from 'moment-timezone';
import PanelModule from 'components/organizers/PanelModule';
import HabitServices from 'services/HabitServices';
import BedtimeHabitPanel from 'components/habits/BedtimeHabitPanel';
import WaketimeHabitPanel from 'components/habits/WaketimeHabitPanel';
import HabitHeatMap from 'components/chart/HabitHeatMap';
import dateViews from 'constants/dateViews';
import useMobile from 'hooks/useMobile';

const TITLE = 'Bedtime/Waketime Tracker  ';
const SUBTITLE = 'Track how often you hit your bedtime & waketime goals.';

const HabitModule = () => {
  const { isMobile } = useMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currDateView, setCurrDateView] = useState(isMobile ? dateViews.W : dateViews.M);
  const [currMonth, setCurrMonth] = useState(moment().format('MMMM'));
  const [startDate, setStartDate] = useState(moment().startOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().endOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'));
  const [bedtimeHabit, setBedtimeHabit] = useState();
  const [waketimeHabit, setWaketimeHabit] = useState();
  const [heatmapData, setHeatmapData] = useState();

  useEffect(() => {
    setStartDate(moment().startOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'));
    setEndDate(moment().endOf(isMobile ? dateViews.W : dateViews.M).format('YYYY-MM-DD'));
    setCurrDateView(isMobile ? dateViews.W : dateViews.M);
  }, [isMobile]);

  useEffect(() => {
    (async () => {
      const { data, error } = await HabitServices
        .getDashboardData(startDate, endDate, currDateView);
      if (error) {
        setErrorMessage('Something went wrong, unable to load your habits...');
      } else {
        console.log(data);
        setBedtimeHabit(data.bedtime);
        setWaketimeHabit(data.waketime);
        setHeatmapData(data.heatmapData);
        console.log(data.heatmapData);
        setErrorMessage(false);
      }
      setIsLoading(false);
    })();
  }, [startDate, endDate, currDateView]);

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
      <Box display="flex" justifyContent="center">
        <Typography variant="subtitle1">{currMonth}</Typography>
      </Box>
      <Box height={160} display="flex" justifyContent="center">
        <HabitHeatMap
          data={heatmapData.data}
          auxData={heatmapData.auxData}
          keys={heatmapData.keys}
        />
      </Box>
      <Box>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={6} sm="auto">
            <Box px={2} py={1} borderRadius={5} style={{ backgroundColor: 'rgb(143, 239, 155)' }}>
              <Typography variant="caption" align="center">0-30 min</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box px={2} py={1} borderRadius={5} style={{ backgroundColor: 'rgba(250,200,86,1)' }}>
              <Typography variant="caption" align="center">30-60 min</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box px={2} py={1} borderRadius={5} style={{ backgroundColor: 'rgba(230,126,86,1)' }}>
              <Typography variant="caption" align="center">60-90 min</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box px={2} py={1} borderRadius={5} style={{ backgroundColor: 'rgba(218,80,87,1)' }}>
              <Typography variant="caption" align="center">90+ min</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
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
export default HabitModule;

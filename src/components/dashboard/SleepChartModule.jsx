import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import moment from 'moment-timezone';
import useDashboardSleep from 'hooks/useDashboardSleep';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';

const DEFAULT_HEIGHT = 400;
const MOBILE_HEIGHT = 250;
const DEFAULT_STEP_SIZE = 3600;
const MOBILE_STEP_SIZE = 7200;

const getOptions = (isMobile) => (
  {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
        },
        stacked: true,
        offset: true,
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: COLORS.BLACK,
          fontSize: 14,
          fontFamily: 'Sora',
        },
      }],
      yAxes: [{
        stacked: true,
        type: 'linear',
        ticks: {
          beginAtZero: true,
          fontFamily: 'Sora',
          suggestedMax: 3600 * 12,
          stepSize: isMobile ? MOBILE_STEP_SIZE : DEFAULT_STEP_SIZE,
          callback(label) {
            return `${(parseInt(label, 10) / 3600).toFixed(0)} HR`;
          },
        },
        gridLines: {
          color: COLORS.GRAY,
          borderDash: [2, 4],
          zeroLineBorderDash: [2, 4],
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: !isMobile,
      position: 'top',
      align: isMobile ? 'start' : 'end',
      labels: {
        fontStyle: 'bold',
        fontFamily: 'Sora',
        usePointStyle: true,
        padding: isMobile ? 30 : 24,

      },
    },
    tooltips: {
      mode: 'x-axis',
      backgroundColor: COLORS.WHITE,
      titleFontFamily: 'Sora',
      titleFontColor: COLORS.BLACK,
      titleFontSize: 12,
      titleMarginBottom: 8,
      bodyFontFamily: 'Sora',
      bodyFontColor: COLORS.BLACK,
      bodyFontSize: 12,
      borderColor: COLORS.BORDER_GRAY,
      borderWidth: 1,
      bodySpacing: 6,
      cornerRadius: 0,
      caretSize: 0,
      xPadding: 12,
      yPadding: 12,
      callbacks: {
        title(tooltipItem) {
          return moment.utc(tooltipItem[0].label).format('MMM DD, YYYY');
        },
        label(tooltipItem) {
          switch (tooltipItem.datasetIndex) {
            case 0:
              return `  ${(tooltipItem.yLabel / 3600).toFixed(1)} HR Light Sleep`;
            case 1:
              return `  ${(tooltipItem.yLabel / 3600).toFixed(1)} HR Deep Sleep`;
            case 2:
              return `  ${(tooltipItem.yLabel / 3600).toFixed(1)} HR REM`;
            case 3:
              return `  ${(tooltipItem.yLabel / 3600).toFixed(1)} HR Total Sleep Avg`;
            default:
              return tooltipItem.yLabel;
          }
        },
      },
    },
  }
);

const getChartData = (lightSeries, deepSeries, remSeries, sleepSeries) => ({
  datasets: [
    {
      label: ' LIGHT SLEEP',
      data: lightSeries,
      backgroundColor: COLORS.LIGHT_PURPLE,
      order: 1,
      categoryPercentage: 0.98,
      barPercentage: 0.98,
    },
    {
      label: ' DEEP SLEEP',
      data: deepSeries,
      backgroundColor: COLORS.LIGHT_BLUE,
      order: 2,
      categoryPercentage: 0.98,
      barPercentage: 0.98,
    },
    {
      label: ' REM',
      data: remSeries,
      backgroundColor: COLORS.DARK_BLUE,
      order: 3,
      categoryPercentage: 0.98,
      barPercentage: 0.98,
    },
    {
      type: 'line',
      label: ' TOTAL SLEEP AVG',
      data: sleepSeries,
      backgroundColor: COLORS.YELLOW,
      borderColor: COLORS.YELLOW,
      borderDash: [5, 5],
      borderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      spanGaps: true,
      fill: false,
      order: 0,
    },
  ],
});

const SleepChartModule = () => {
  const { isMobile } = useMobile();
  const { data } = useDashboardSleep();
  const [chartData, setChartData] = useState();
  const chartOptions = React.useCallback(getOptions(isMobile), [isMobile]);

  useEffect(() => {
    if (!data) { return; }

    const lightSeries = [];
    const deepSeries = [];
    const remSeries = [];
    let totalSleep = 0;
    const sleepSeries = [];

    data.forEach((ss) => {
      lightSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.lightSleepDuration });
      deepSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.deepSleepDuration });
      remSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.remSleepDuration });
      // totalSleep += SleepSummaryServices.getSleepHoursDuration(ss);
      totalSleep += (ss.lightSleepDuration + ss.deepSleepDuration + ss.remSleepDuration);
      sleepSeries.push({
        t: moment.utc(ss.date).format('YYYY-MM-DD'),
        y: (totalSleep / (sleepSeries.length + 1)),
      });
    });

    setChartData(getChartData(lightSeries, deepSeries, remSeries, sleepSeries));
  }, [data]);

  if (chartData) {
    return (
      <div>
        <Box mb={2}>
          <Typography variant="subtitle1">Your Sleep Trends</Typography>
        </Box>
        { isMobile ? <ChartLegend /> : null }
        <Box height={isMobile ? MOBILE_HEIGHT : DEFAULT_HEIGHT}>
          <Bar data={chartData} options={chartOptions} height={isMobile ? MOBILE_HEIGHT : DEFAULT_HEIGHT} />
        </Box>
      </div>
    );
  }
  return null;
};

const useStyles = makeStyles((theme) => ({
  legendLabel: {
    paddingLeft: theme.spacing(1),
  },
}));

const ChartLegend = () => {
  const classes = useStyles();

  return (
    <Box ml={2} mb={4}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <CircleSvg radius={8} color={COLORS.YELLOW} />
            <Typography variant="h4" className={clsx(classes.legendLabel)}>TOTAL SLEEP AVG</Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <CircleSvg radius={8} color={COLORS.LIGHT_PURPLE} />
            <Typography variant="h4" className={clsx(classes.legendLabel)}>LIGHT SLEEP</Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <CircleSvg radius={8} color={COLORS.LIGHT_BLUE} />
            <Typography variant="h4" className={clsx(classes.legendLabel)}>DEEP SLEEP</Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <CircleSvg radius={8} color={COLORS.DARK_BLUE} />
            <Typography variant="h4" className={clsx(classes.legendLabel)}>REM</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const CircleSvg = ({ radius, color }) => {
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle cx={radius} cy={radius} r={radius} stroke={color} strokeWidth="1" fill={color} />
    </svg>
  );
};

export default SleepChartModule;

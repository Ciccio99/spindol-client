import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
} from '@material-ui/core';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment-timezone';
import SleepSummaryServices from 'services/SleepSummaryServices';

Chart.plugins.unregister(ChartDataLabels);
// moment.tz.setDefault('UTC');

const SLEEP_STATE_COLOR = {
  awake: '#bdbcbc',
  light: '#a9f9f8',
  deep: '#5f5fc6',
  rem: '#5d2e9b',
};

const SleepQualityBar = ({ sleepSummaries }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(3);

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setAspectRatio(1.25);
      return;
    }
    setAspectRatio(3);
  }, []);

  useEffect(() => {
    if (!sleepSummaries || sleepSummaries.length === 0) {
      return;
    }

    const lightSeries = [];
    const deepSeries = [];
    const remSeries = [];
    let totalSleep = 0;
    const totalSleepSeries = [];

    sleepSummaries
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .forEach((ss) => {
        lightSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.lightSleepDuration });
        deepSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.deepSleepDuration });
        remSeries.push({ t: moment.utc(ss.date).format('YYYY-MM-DD'), y: ss.remSleepDuration });
        totalSleep += SleepSummaryServices.getSleepHoursDuration(ss);
        totalSleepSeries.push({
          t: moment.utc(ss.date).format('YYYY-MM-DD'),
          y: (totalSleep / (totalSleepSeries.length + 1)) * 3600,
        });
      });
    const newChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Light',
            data: lightSeries,
            backgroundColor: SLEEP_STATE_COLOR.light,
            order: 1,
          },
          {
            label: 'Deep',
            data: deepSeries,
            backgroundColor: SLEEP_STATE_COLOR.deep,
            order: 2,
          },
          {
            label: 'REM',
            data: remSeries,
            backgroundColor: SLEEP_STATE_COLOR.rem,
            order: 3,
          },
          {
            type: 'line',
            label: 'Total Sleep Avg',
            data: totalSleepSeries,
            backgroundColor: 'rgba(230, 126, 86, 0.75)',
            borderColor: 'rgb(230, 126, 86)',
            borderDash: [10, 5],
            borderWidth: 3,
            spanGaps: true,
            fill: false,
            order: 0,
          },
        ],
      },
      options: {
        aspectRatio,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
              },
              stacked: true,
              offset: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              type: 'linear',
              ticks: {
                beginAtZero: true,
                stepSize: 3600,
                callback(label) {
                  return `${(parseInt(label, 10) / 3600).toFixed(0)} hr`;
                },
              },
            },
          ],
        },
        tooltips: {
          mode: 'x-axis',
          callbacks: {
            title(tooltipItem) {
              return moment.utc(tooltipItem[0].label).format('MMM DD, YYYY');
            },
            label(tooltipItem) {
              switch (tooltipItem.datasetIndex) {
                case 0:
                  return `${(tooltipItem.yLabel / 3600).toFixed(1)} hrs Light`;
                case 1:
                  return `${(tooltipItem.yLabel / 3600).toFixed(1)} hrs Deep`;
                case 2:
                  return `${(tooltipItem.yLabel / 3600).toFixed(1)} hrs REM`;
                case 3:
                return `${(tooltipItem.yLabel / 3600).toFixed(1)} Total Sleep Avg`;
                default:
                  return tooltipItem.yLabel;
              }
            },
          },
        },
        // plugins: {
        //   datalabels: {
        //     color: '#FFFFFF',
        //     font: {
        //       size: 10,
        //       weight: 600,
        //     },
        //     formatter(value) {
        //       console.log(value);
        //       return `${(value.y / 3600).toFixed(1)} hrs`;
        //     },
        //   },
        // },
      },
      // plugins: [ChartDataLabels],
    });

    setChart(newChart);
  }, [sleepSummaries, aspectRatio]);


  return (
    <Box width="100%" display="flex" justifyContent="center">
      <canvas ref={chartRef} />
    </Box>
  );
};

export default SleepQualityBar;

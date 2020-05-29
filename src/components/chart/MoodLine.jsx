import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
} from '@material-ui/core';
import Chart from 'chart.js';
import moment from 'moment-timezone';
import MoodUtil from 'utils/MoodUtil';
import MOOD_COLOR_MAP from '../../constants/moodColor';

const MoodLine = ({ dailyDiaries, checkIns }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [datasetSettings, setDatasetSettings] = useState({});

  useEffect(() => {
    let settings = {
      radius: 8,
      hoverRadius: 12,
    };
    if (window.innerWidth <= 600) {
      settings = {
        radius: 4,
        hoverRadius: 6,
      };
    }
    setDatasetSettings(settings);
  }, []);

  useEffect(() => {
    if (!dailyDiaries.length || !checkIns.length) {
      return;
    }

    const ddData = dailyDiaries
      .map((dd) => ({ t: moment.utc(dd.date).format('YYYY-MM-DD'), y: MoodUtil.MOOD_NUM_MAP[dd.mood] }))
      .sort((a, b) => (a.t < b.t ? -1 : 1));
    const ddDataColoring = dailyDiaries.map((dd) => MOOD_COLOR_MAP[dd.mood]);
    const checkInsData = checkIns
      .map((checkIn) => ({ t: moment.utc(checkIn.date).format('YYYY-MM-DD'), y: checkIn.completed }))
      .sort((a, b) => (a.t < b.t ? -1 : 1));

    const newChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Mood',
            data: ddData,
            fill: false,
            yAxisID: 'mood',
            pointBackgroundColor: ddDataColoring,
            pointBorderColor: 'transparent',
            ...datasetSettings,
            borderColor: 'rgba(230, 126, 86, 0.75)',
            spanGaps: true,
          },
          {
            label: 'Trial Completed',
            type: 'bar',
            data: checkInsData,
            yAxisID: 'trials-completed',
            barThickness: 3,
            backgroundColor: '#9072BA',
          },
        ],
      },
      options: {
        hover: {
          mode: 'x-axis',
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
            },
            gridLines: {
              display: false,
            },
            offset: true,
          }],
          yAxes: [
            {
              id: 'mood',
              type: 'linear',
              gridLines: false,
              ticks: {
                min: -0.1,
                max: 4.1,
                callback(label) {
                  return MoodUtil.NUM_MOOD_MAP[label];
                },
              },
            },
            {
              id: 'trials-completed',
              scaleLabel: {
                display: false,
              },
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title(tooltipItem) {
              return moment.utc(tooltipItem[0].label).format('MMM DD, YYYY');
            },
            label(tooltipItem) {
              switch (tooltipItem.datasetIndex) {
                case 0:
                  return `${MoodUtil.NUM_MOOD_MAP[tooltipItem.yLabel]}`;
                case 1:
                  return `Trial ${tooltipItem.yLabel === 1 ? 'Completed' : 'Incomplete'}`;
                default:
                  return tooltipItem.yLabel;
              }
            },
          },
        },
      },
    });
    setChart(newChart);
  }, [dailyDiaries, checkIns, datasetSettings]);

  return (
    <Box width="100%">
      <canvas ref={chartRef} />
    </Box>
  );
};

export default MoodLine;

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
} from '@material-ui/core';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import MOOD_COLOR_MAP from '../../constants/moodColor';

Chart.plugins.unregister(ChartDataLabels);

const MoodDoughnut = ({ dailyDiaries }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!dailyDiaries) {
      return;
    }
    const moodCount = {
      excellent: 0,
      good: 0,
      meh: 0,
      bad: 0,
      awful: 0,
    };

    dailyDiaries.forEach((dd) => {
      moodCount[dd.mood] += 1;
    });

    const newChart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Excellent', 'Good', 'Meh', 'Bad', 'Awful'],
        datasets: [{
          data: [
            moodCount.excellent,
            moodCount.good,
            moodCount.meh,
            moodCount.bad,
            moodCount.awful,
          ],
          backgroundColor: Object.values(MOOD_COLOR_MAP),
        }],
      },
      plugins: [ChartDataLabels],
      options: {
        aspectRatio: 1.25,
        maintainAspectRatio: false,
        rotation: Math.PI,
        plugins: {
          datalabels: {
            color: '#FFFFFF',
            font: {
              size: 14,
              weight: 600,
            },
            display(context) {
              return context.dataset.data[context.dataIndex] !== 0;
            },
          },
        },
      },
    });
    setChart(newChart);
  }, [dailyDiaries]);

  return (
    <Box width="100%">
      <canvas ref={chartRef} />
    </Box>
  );
};

export default MoodDoughnut;

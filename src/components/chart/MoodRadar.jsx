import React, { useState, useEffect, useRef } from 'react';
import {
  Box, rgbToHex,
} from '@material-ui/core';
import Chart from 'chart.js';

const MoodRadar = () => {
  const chartRef = useRef(null);
  const [radarChart, setRadarChart] = useState(null);

  useEffect(() => {
    const newRadarChartInstance = new Chart(chartRef.current, {
      type: 'radar',
      data: {
        labels: ['Excellent', 'Good', 'Meh', 'Bad', 'Awful'],
        datasets: [{
          data: [4, 5, 3, 2, 1],
          fill: true,
          borderColor: '#ffae83',
          borderWidth: 5,
          backgroundColor: 'transparent',
          pointRadius: 0,
        }],
      },
      options: {
        scale: {
          angleLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
        legend: {
          display: false,
        },
        aspectRatio: 1.25,
      },
    });
    setRadarChart(newRadarChartInstance);
  }, []);

  return (
    <Box>
      <canvas ref={chartRef} />
    </Box>
  );
};

export default MoodRadar;

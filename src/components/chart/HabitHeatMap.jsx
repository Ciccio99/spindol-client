import React, { useState, useEffect, useRef } from 'react';
import {
  Divider,
  Typography,
} from '@material-ui/core';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import HabitUtils from 'utils/HabitUtils';

const CustomCell = ({
  value,
  x,
  y,
  width,
  height,
  opacity,
  borderWidth,
  borderColor,
  onHover,
  onLeave,
  enableLabel,
}) => (
  <g
    transform={`translate(${x}, ${y})`}
    onPointerOver={onHover}
    onPointerLeave={onLeave}
  >
    <rect
      height={height}
      width={width}
      strokeWidth={borderWidth}
      fill={HabitUtils.mapDiffToColor(value)}
      fillOpacity={opacity}
      stroke={borderColor}
      rx={10}
      x={`-${width / 2}`}
      y={`-${height / 2}`}
    />
    <text
      display={enableLabel ? 'inline' : 'none'}
      dominantBaseline="central"
      textAnchor="middle"
      style={{ fill: '#FFF' }}
    >
      {value}
    </text>
  </g>
);

const CustomTooltip = ({ value, habitName, auxData }) => {
  if (auxData.timeActual === -1 && auxData.timeTarget === -1) {
    return (<>{`No ${habitName} data available`}</>);
  }
  return (
    <>
      <Typography variant="caption" display="block">
        <strong>{auxData.date}</strong>
      </Typography>
      <Divider />
      <Typography variant="caption" display="block">
        {auxData.timeActual !== -1 && `Actual ${habitName}: ${auxData.timeActual}`}
      </Typography>
      <Typography variant="caption" display="block">
        {auxData.timeTarget !== -1 && `Target ${habitName}: ${auxData.timeTarget}`}
      </Typography>
      <Typography variant="caption" display="block">
        {value !== -1 && `Time Δ: ${value} mins`}
      </Typography>
    </>
  );
};
const HabitHeatMap = ({ data, auxData, keys }) => (
  <>
    <ResponsiveHeatMap
      data={data}
      indexBy="habit"
      keys={keys}
      margin={{
        right: 20, left: 60,
      }}
      padding={2}
      forceSquare
      axisTop={{
        orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      cellShape={CustomCell}
      tooltip={({ yKey, xKey, ...otherProps }) => {
        const tooltipData = auxData[yKey][xKey];
        return (<CustomTooltip auxData={tooltipData} habitName={yKey} {...otherProps} />);
      }}
      cellOpacity={1}
      cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
      enableLabels={false}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(0, 0, 0, 0.1)',
          rotation: -45,
          lineWidth: 4,
          spacing: 2,
        },
      ]}
      fill={[{ id: 'lines' }]}
      animate={false}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOpacity={0.6}
      cellHoverOthersOpacity={1}
    />

  </>
);

export default HabitHeatMap;

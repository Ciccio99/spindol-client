import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import HabitUtils from 'utils/HabitUtils';

// const data = [{
//   habit: 'Bedtime',
//   '01': { targetDiff: 50, meow: 'meow' },
//   '02': { targetDiff: 40, meow: 'meow' },
//   '03': { targetDiff: 30, meow: 'meow' },
//   '04': { targetDiff: 50, meow: 'meow' },
// }];

const CustomCell = ({
  value,
  x,
  y,
  width,
  height,
  color,
  opacity,
  borderWidth,
  borderColor,
  textColor,
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

const CustomTooltip = ({ habitName, auxData }) => {
  if (auxData.timeActual === -1 && auxData.timeTarget === -1) {
    return (<>{`No ${habitName} data available`}</>);
  }
  return (
    <>
      {auxData.timeActual !== -1 && `Actual ${habitName}: ${auxData.timeActual}`}
      <br />
      {auxData.timeTarget !== -1 && `Target ${habitName}: ${auxData.timeTarget}`}
    </>
  );
};
const HabitHeatMap = ({ data, auxData, keys }) => (

  <ResponsiveHeatMap
    data={data}
    indexBy="habit"
    keys={keys}
    margin={{
      top: -20, right: 20, bottom: -20, left: 60,
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
      console.log(otherProps);
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
);

export default HabitHeatMap;

import React from 'react';
import {
  Box, Typography,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import colors from 'constants/colors';
import useMobile from 'hooks/useMobile';

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
      fill={value === 1 ? colors.GREEN : colors.GRAY}
      fillOpacity={opacity}
      stroke={borderColor}
      rx={5}
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

const CustomTooltip = ({ xKey, yKey, value }) => (
  <Box display="flex" alignItems="center">
    <Typography display="inline">{`${xKey} - ${yKey}`}</Typography>
    {
      value
        ? <DoneIcon fontSize="small" htmlColor={colors.GREEN} style={{ marginLeft: '6px' }} />
        : <CloseIcon fontSize="small" htmlColor={colors.RED} style={{ marginLeft: '6px' }} />
    }
  </Box>
);

const calculateCellHeight = (dataLength, dataWidth, isMobile) => {
  if (isMobile || dataWidth > 7) {
    return dataLength * 30;
  }
  return dataLength * 40;
};

const TagsHeatMap = ({ data, keys }) => (
  <Box height={calculateCellHeight(data.length, keys.length, useMobile().isMobile)}>
    <ResponsiveHeatMap
      data={data}
      indexBy="tag"
      keys={keys}
      margin={{
        right: 20, top: 20, left: 100,
      }}
      padding={2}
      forceSquare
      axisTop={{
        orient: 'bottom', tickSize: 0, tickPadding: 10, tickRotation: 0, legend: '', legendOffset: 36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
      }}
      cellShape={CustomCell}
      tooltip={CustomTooltip}
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
  </Box>
);

export default TagsHeatMap;

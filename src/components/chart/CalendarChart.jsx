import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveCalendar } from '@nivo/calendar';
import COLORS from 'constants/colors';

const CustomToolTip = ({ day, value }) => (
  <span>
    {`${day}: `}
    <span role="img" aria-label="Great Success">
      🙌
    </span>
    <span style={{ color: COLORS.GREEN, fontWeight: 600 }}>{` ${
      value === 1 ? 'Great Success' : 'Nope'
    }`}</span>
  </span>
);

const CalendarChart = ({ data, variant }) => {
  const color = (() => {
    switch (variant) {
      case 'secondary':
        return [COLORS.LIGHT_BLUE];
      default:
        return [COLORS.DARK_BLUE];
    }
  })();

  return (
    <ResponsiveCalendar
      data={data}
      from={data[0].day}
      to={data[data.length - 1].day}
      tooltip={CustomToolTip}
      emptyColor={COLORS.LIGHTEST_GRAY}
      colors={color}
      margin={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 40,
      }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
};

CalendarChart.propType = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

CalendarChart.defaultProps = {
  variant: 'primary',
};

export default CalendarChart;

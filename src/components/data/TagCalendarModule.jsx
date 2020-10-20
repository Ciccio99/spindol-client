import PropTypes from 'prop-types';
import React from 'react';
import PanelModule from 'components/organizers/PanelModule';
import CalendarChart from 'components/chart/CalendarChart';

const getData = (series, tag) => {
  const data = [];
  series.forEach((seriesData) => {
    const match = seriesData?.diary?.diaryTags?.some((t) => t._id === tag._id);
    if (!match) {
      // data.push({ day: seriesData.date, value: 0 });
      return;
    }
    data.push({ day: seriesData.date, value: 1 });
  });
  return data;
};

const TagCalendarModule = ({ series, tag, variant }) => {
  const title = `${tag.tag} Tag Usage this Year`;
  const data = React.useMemo(() => getData(series, tag), [series, tag]);

  return (
    <PanelModule title={title}>
      <div style={{ height: '200px' }}>
        <CalendarChart data={data} variant={variant} />
      </div>
    </PanelModule>
  );
};

TagCalendarModule.propType = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

TagCalendarModule.defaultProps = {
  variant: 'primary',
};

export default TagCalendarModule;

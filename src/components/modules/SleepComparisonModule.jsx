import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import PanelModule from 'components/organizers/PanelModule';
import SleepSummaryServices from 'services/SleepSummaryServices';

const TITLE = 'Sleep';
const green = { color: '#5DBD88' };
const red = { color: '#DE1E3D' };

const getSubtitle = (date) => {
  return date ? `Last sync on ${date}` : undefined;
};

const StatsDisplay = ({ date }) => {
  const { data, error, isPending } = useAsync(SleepSummaryServices.getDashboardComparisonData, { searchDate: date });

  if (isPending) {
    return (
      <PanelModule title={TITLE}>
        <Box>
          <LinearProgress color="secondary" />
        </Box>
      </PanelModule>
    );
  }

  if (error) {
    return (
      <PanelModule title={TITLE}>
        <Typography variant="subtitle1">Something went wrong...</Typography>
      </PanelModule>
    );
  }

  if (data.todayStats && data.baselineStats) {
    return (
      <PanelModule title={TITLE} subtitle={getSubtitle(data.lastSyncDate)}>
        <Box>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell variant="body" padding="checkbox" align="left">Last Night</TableCell>
                <TableCell variant="body" padding="checkbox" align="center" />
                <TableCell variant="body" padding="checkbox" align="right">Average</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.keys.map((key) => (
                <TableRow key={key}>
                  <TableCell align="left" variant="head" padding="none">
                    <Typography color="primary" variant="subtitle1" display="inline" noWrap>
                      <strong>
                        {`${data.todayStats[key].stat}${data.todayStats[key].units ? ` ${data.todayStats[key].units}` : ''}`}
                      </strong>
                      {
                      data.todayStats[key].diffPercent
                      && (
                      <Typography variant="subtitle2" noWrap display="inline" style={data.todayStats[key].diffPercent >= 0 ? green : red}>
                        {` (${data.todayStats[key].diffPercent}%)`}
                      </Typography>
                      )
                    }
                    </Typography>

                  </TableCell>
                  <TableCell padding="none" align="center"><Typography variant="caption">{data.baselineStats[key].description}</Typography></TableCell>
                  <TableCell align="right" variant="head">
                    <Typography color="primary" variant="subtitle1">
                      <strong>{`${data.baselineStats[key].stat}${data.baselineStats[key].units ? ` ${data.baselineStats[key].units}` : ''}`}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PanelModule>
    );
  }

  if (data.baselineStats) {
    return (
      <PanelModule title={TITLE} subtitle={getSubtitle(data.lastSyncDate)}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell padding="checkbox" align="right">Average</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.keys.map((key) => (
                <TableRow key={data.baselineStats[key].description}>
                  <TableCell align="left"><Typography variant="caption">{data.baselineStats[key].description}</Typography></TableCell>
                  <TableCell align="right" variant="head">
                    <Typography color="primary" variant="subtitle1">
                      <strong>{`${data.baselineStats[key].stat}${data.baselineStats[key].units ? ` ${data.baselineStats[key].units}` : ''}`}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PanelModule>
    );
  }

  return null;
};

export default React.memo(StatsDisplay);

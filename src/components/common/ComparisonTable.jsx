import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import colors from 'constants/colors';
import useMobile from 'hooks/useMobile';

const ComparisonTable = ({
  keys, newStats, baselineStats, newLabel, baselineLabel,
}) => {
  const { isMobile } = useMobile();

  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell variant="body" padding="checkbox" align="left">{newLabel || 'New Data'}</TableCell>
          <TableCell variant="body" padding="checkbox" align="center" />
          <TableCell variant="body" padding="checkbox" align="right">{baselineLabel || 'Baseline'}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keys.map((key) => (
          <TableRow key={key}>
            <TableCell align="left" variant="head" padding={isMobile ? 'none' : 'default'}>
              <Typography color="primary" variant="subtitle1" display="inline" noWrap>
                <strong>
                  {`${newStats[key].stat}${newStats[key].units ? ` ${newStats[key].units}` : ''}`}
                </strong>
              </Typography>
              {
                newStats[key].diffPercent
                && (
                <Typography
                  variant="subtitle2"
                  noWrap
                  display="inline"
                  style={{ color: newStats[key].diffPercent >= 0 ? colors.GREEN : colors.RED }}
                >
                  {` (${newStats[key].diffPercent}%)`}
                </Typography>
                )
              }
            </TableCell>
            <TableCell align="center"><Typography variant="caption">{baselineStats[key].description}</Typography></TableCell>
            <TableCell align="right" variant="head" padding={isMobile ? 'none' : 'default'}>
              <Typography color="primary" variant="subtitle1">
                <strong>{`${baselineStats[key].stat}${baselineStats[key].units ? ` ${baselineStats[key].units}` : ''}`}</strong>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComparisonTable;

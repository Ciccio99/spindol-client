import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import COLORS from 'constants/colors';
import useMobile from 'hooks/useMobile';

const PercentLabel = ({ value }) => {
  if (value < 1 && value > -1) {
    return (
      <Typography
        variant="subtitle2"
        noWrap
        display="inline"
        style={{ color: COLORS.GRAY }}
      >
        {` (${value}%)`}
      </Typography>
    );
  }
  return (
    <Typography
      variant="subtitle2"
      noWrap
      display="inline"
      style={{ color: value >= 0 ? COLORS.GREEN : COLORS.RED }}
    >
      {` (${value}%)`}
    </Typography>
  );
};

const ComparisonTable = ({
  keys,
  stats1,
  stats2,
  stats1Label,
  stats1CountLabel,
  stats2Label,
  stats2CountLabel,
}) => {
  const { isMobile } = useMobile();

  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell variant="body" padding="checkbox" align="left">
            <Typography variant="subtitle1">
              {stats1Label || 'New Data'}
            </Typography>
            <Typography variant="caption" noWrap>
              {stats1CountLabel}
            </Typography>
          </TableCell>
          <TableCell variant="body" padding="checkbox" align="center" />
          <TableCell variant="body" padding="checkbox" align="right">
            <Typography variant="subtitle1">
              {stats2Label || 'Baseline'}
            </Typography>
            <Typography variant="caption" noWrap>
              {stats2CountLabel}
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keys.map((key) => (
          <TableRow key={key}>
            <TableCell
              align="left"
              variant="head"
              padding={isMobile ? 'none' : 'default'}
            >
              <Typography
                color="primary"
                style={{ color: COLORS.DARK_BLUE }}
                variant="subtitle1"
                display={isMobile ? undefined : 'inline'}
                noWrap
              >
                <strong>
                  {`${stats1[key].stat}${
                    stats1[key].units ? ` ${stats1[key].units}` : ''
                  }`}
                </strong>
              </Typography>
              {stats1[key].diffPercent && (
                <PercentLabel value={stats1[key].diffPercent} />
              )}
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">
                {stats2[key].description}
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              variant="head"
              padding={isMobile ? 'none' : 'default'}
            >
              <Typography
                color="primary"
                style={{ color: COLORS.DARK_BLUE }}
                variant="subtitle1"
                display={isMobile ? undefined : 'inline'}
                noWrap
              >
                <strong>{`${stats2[key].stat}${
                  stats2[key].units ? ` ${stats2[key].units}` : ''
                }`}</strong>
              </Typography>
              {stats2[key].diffPercent && (
                <PercentLabel value={stats2[key].diffPercent} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComparisonTable;

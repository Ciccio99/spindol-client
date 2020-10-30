import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import useDashboardSleep from 'hooks/useDashboardSleep';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  textHighlight: { color: COLORS.RED },
  cellPadding: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  svgText: {
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.h4.fontFamily,
    fontWeight: theme.typography.h4.fontWeight,
  },
}));

const SleepGoalsModule = () => {
  const classes = useStyles();
  const { data } = useDashboardSleep();

  if (data) {
    return (
      <div>
        <div>
          <Typography variant="subtitle1">
            {'Bedtime and Waketime over the last '}
            <span className={clsx(classes.textHighlight)}>7 days</span>
          </Typography>
        </div>
        <Box mt={2}>
          <Paper elevation={24}>
            <Box px={1} py={2} display="flex" justifyContent="center" alignItems="center">
              <table>
                <thead>
                  <tr>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 20</Typography></th>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 21</Typography></th>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 22</Typography></th>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 23</Typography></th>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 24</Typography></th>
                    <th className={clsx(classes.cellPadding)}><Typography variant="h4">Oct 25</Typography></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                  </tr>
                  <tr>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                    <td className={clsx(classes.cellPadding)}><CircleSvg radius={36} color={COLORS.PEACH} text="-30 min" /></td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
  return null;
};

const CircleSvg = ({ radius, color, text }) => {
  const classes = useStyles();

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle cx={radius} cy={radius} r={radius} stroke={color} strokeWidth="0" fill={color} />
      {
        text
          ? (
            <text className={clsx(classes.svgText)} x="50%" y="50%" textAnchor="middle" alignmentBaseline="central">
              {text}
            </text>
          )
          : null
      }

    </svg>
  );
};

export default SleepGoalsModule;

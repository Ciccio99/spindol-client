import React from 'react';
import {
  Paper,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  grayText: { color: COLORS.GRAY },
  redText: { color: COLORS.RED },
  greenText: { color: COLORS.GREEN },
}));

const SleepCard = ({
  stat, compareStat, units, description, diff, diffUnit,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={24}>
      <Box p={2} minHeight="200px" display="flex" flexDirection="column" justifyContent="space-between">
        <Typography variant="caption">{description}</Typography>
        <Box>
          <div>
            <Typography variant="h4" display="inline">{stat}</Typography>
            <Typography variant="h6" color="textSecondary" display="inline">{` ${units}`}</Typography>
          </div>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="textSecondary" display="inline">{`Avg: ${compareStat} ${units}`}</Typography>
            <DiffLabel diff={diff} diffUnit={diffUnit} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const DiffLabel = ({ diff, diffUnit }) => {
  const classes = useStyles();
  if (!diff) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      noWrap
      display="inline"
      className={clsx({
        [classes.grayText]: (diff > -1 && diff < 1),
        [classes.greenText]: (diff >= 1),
        [classes.redText]: (diff <= 1),
      })}
    >
      {`${diff}% ${diffUnit}`}
    </Typography>
  );
};

export default SleepCard;

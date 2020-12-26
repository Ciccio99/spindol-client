import React from 'react';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';


const useStyles = makeStyles((theme) => ({
  grayText: { color: COLORS.GRAY },
  redText: { color: COLORS.RED },
  greenText: { color: COLORS.GREEN },
  textCaps: {
    textTransform: 'uppercase',
  },
  card: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '140px',
  },
  cardMobile: {
    minHeight: '120px',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const SleepCard = ({
  stat, compareStat, units, description, diff, diffUnit,
}) => {
  const { isMobile } = useMobile();
  const classes = useStyles();

  return (
    <Paper elevation={24}>
      <div className={clsx(classes.card, { [classes.cardMobile]: isMobile })}>
        <div>
          <Typography variant="body1" gutterBottom>{description}</Typography>
          <Typography variant="h2">{`${stat} ${units || ''}`}</Typography>
        </div>
        <div className={clsx(classes.bottomContainer)}>
          <Typography className={clsx(classes.textCaps)} variant="body1" color="textSecondary" display="inline">{`AVG: ${compareStat} ${units || ''}`}</Typography>
          { diff ? <DiffLabel diff={diff} diffUnit={diffUnit} /> : null }
        </div>
      </div>
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
      variant="body1"
      noWrap
      display="inline"
      className={clsx(classes.textCaps, {
        [classes.grayText]: (diff === 0),
        [classes.greenText]: (diff > 0),
        [classes.redText]: (diff < 0),
      })}
    >
      {`${diff}${diffUnit.toLowerCase() === 'bpm' ? '%' : ''} ${diffUnit}`}
    </Typography>
  );
};

export default SleepCard;

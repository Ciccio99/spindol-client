import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import useMobile from 'hooks/useMobile';
import useSleepComparison from 'hooks/useSleepComparison';
import useSleepMoodCorrelation from 'hooks/useSleepMoodCorrelation';
import SleepCard from 'components/common/SleepCard';
import COLORS from 'constants/colors';
import { MOODS, getMoodIcon } from 'constants/mood';

const useStyles = makeStyles((theme) => ({
  totalSleepBg: {
    background: props => `linear-gradient(90deg, ${COLORS.LIGHT_GREEN} ${props.percentage}%, rgba(0,0,0,0) ${100 - props.percentage}%)`,
  },
  avgText: {
    color: COLORS.DARK_BLUE,
    marginRight: theme.spacing(1),
  },
  diffText: {
    color: COLORS.WHITE,
  },
  sleepMoodLine: {
    position: 'absolute',
    left: props => `${props.xPercentage}%`,
    stroke: COLORS.WHITE,
  },
  sleepMoodLineInverse: {
    stroke: COLORS.LIGHT_GREEN,
  },
  moodFace: {
    position: 'absolute',
    marginLeft: '-19px',
    marginTop: '-19px',
    left: props => `${props.xPercentage}%`,
    bottom: '10%',
    zIndex: 1,
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  },
  moodFaceClicked: {
    transform: 'scale(1.1)',
  },
  textHighlight: {
    color: COLORS.RED,
  },
  awesomeY: {
    top: '10%',
  },
  goodY: {
    top: '30%',
  },
  mehY: {
    top: '50%',
  },
  badY: {
    top: '70%',
  },
  awfulY: {
    top: '90%',
  },
}));

const SleepModule = () => {
  const classes = useStyles();
  const { isLoading, isError, data, error } = useSleepComparison();

  // TODO: Need a loading state?

  if (data?.todayStats) {
    return (
      <div>
        <Box mb={2}>
          <Typography variant="subtitle1">Your sleep from <span className={clsx(classes.textHighlight)}>last night</span></Typography>
        </Box>
        <SleepTotalCard
          total={data.todayStats.sleepDuration.stat}
          avg={data.baselineStats.sleepDuration.stat}
          delta={data.todayStats.sleepDuration.diffPercent}
          min={data.sleepStats.min}
          max={data.sleepStats.max}
        />
        <Box mt={3}>
          <Grid container spacing={4}>
            {
              data.keys.filter((key) => key !== 'sleepDuration').map((key) => (
                <Grid key={key} item xs={12} sm={6} md={3}>
                  <SleepCard

                    description={data.todayStats[key].description}
                    units={data.todayStats[key].units}
                    stat={data.todayStats[key].stat}
                    compareStat={data.baselineStats[key].stat}
                    diff={data.todayStats[key].diffPercent}
                    diffUnit={data.todayStats[key].units}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </div>
    );
  }

  return null;
};

const SleepTotalCard = ({ total, avg, delta, min, max }) => {
  const percentage = (total / max).toFixed(2) * 100;
  const classes = useStyles({ percentage });
  const { data } = useSleepMoodCorrelation();
  const { isMobile } = useMobile();

  return (
    <Paper elevation={24} style={{ position: 'relative' }}>
      {
        data
        ? Object.keys(data).map((key) => (
          <SleepMoodLine
            key={key}
            mood={key}
            height={200}
            xPercentage={(data[key].average / max * 100).toFixed(2)}
            currPercentage={percentage}
            duration={data[key].average}
            count={data[key].count}
          />
        ))
        : null
      }
      <Box className={clsx(classes.totalSleepBg)} p={2} height={200} display="flex" flexDirection="column" justifyContent="space-between">
        <Typography variant="subtitle1">Total Sleep</Typography>
        <div>
          <Typography variant="h2">{`${total} hrs`}</Typography>
          <Typography className={clsx(classes.avgText)} variant="subtitle1" display="inline">{`AVG: ${avg} HRS`}</Typography>
          <Typography className={clsx(classes.diffText)} variant="subtitle1" display={isMobile ? 'default' : 'inline'}>{`${delta} HOURS`}</Typography>
        </div>
      </Box>
    </Paper>
  );
};

const SleepMoodLine = ({ mood, height, xPercentage, currPercentage, duration, count }) => {
  const classes = useStyles({ xPercentage });

  return (
    <>
    <svg className={clsx(classes.sleepMoodLine)} width="3" height={height || 50 } viewBox="0 0 3 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line className={clsx({ [classes.sleepMoodLineInverse]: parseInt(xPercentage) > parseInt(currPercentage) })} x1="0" y1="0" x2="0" y2="200" strokeWidth="5"/>
    </svg>
    <MoodSvg mood={mood} xPercentage={xPercentage} count={count} duration={duration} />
    </>
  );
};

const MoodSvg = ({ mood, duration, count, xPercentage }) => {
  const classes = useStyles({ xPercentage });
  const MoodIcon = getMoodIcon(mood);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <MoodIcon
        className={clsx(classes.moodFace, {
          [classes.awesomeY]: mood === MOODS.EXCELLENT,
          [classes.goodY]: mood === MOODS.GOOD,
          [classes.mehY]: mood === MOODS.MEH,
          [classes.badY]: mood === MOODS.BAD,
          [classes.awfulY]: mood === MOODS.AWFUL,
          [classes.moodFaceClicked]: Boolean(anchorEl),
        })}
        size={40}
        onClick={handleClick}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null); }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        elevation={24}
      >
        <Box p={2} maxWidth={280}>
          <Box mb={1}>
            <Typography variant="body1">{`When you get around ${(duration).toFixed(1)} hours of sleep you feel ${mood}`}</Typography>
          </Box>
          <Typography variant="h4">{count} {count === 1 ? 'time' : 'times'} slept around <span className={clsx(classes.textHighlight)}>{(duration).toFixed(1)} hrs</span></Typography>
        </Box>
      </Popover>
  </>
  );
};

export default SleepModule;

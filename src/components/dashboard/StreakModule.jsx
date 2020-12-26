import React from 'react';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FlameIcon } from 'components/common/Icons';
import useStreakStats from 'hooks/useStreakStats';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(3),
  },
  streak: {
    marginRight: theme.spacing(1),
  },
}));

const Container = ({ children }) => (
  <Box>
    <Box mb={2}>
      <Typography variant="subtitle1">Check-in</Typography>
    </Box>
    <Paper elevation={24} style={{ minHeight: '100%' }}>
      {children}
    </Paper>
  </Box>
);

const StreakModule = () => {
  const { isLoading, isError, data, error } = useStreakStats();
  const classes = useStyles();

  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Typography variant="h4">{error.message}</Typography>
      </Container>
    );
  }

  if (data) {
    return (
      <Container>
        <Box p={3} display="flex" alignItems="center" maxHeight={100} height="100%">
          <div className={clsx(classes.icon)}>
            <FlameIcon />
          </div>
          <Box marginTop={-1} display="flex" flexDirection="column">
            <div>
              <Typography className={clsx(classes.streak)} variant="h1" display="inline">{data.currentStreak}</Typography>
              <Typography variant="subtitle1" display="inline">
                day streak
              </Typography>
            </div>
            <div>
              <Typography variant="h4" color="textSecondary">
                {`LONGEST: ${data.highScore} DAYS`}
              </Typography>
            </div>
          </Box>
        </Box>
      </Container>
    );
  }

  return null;
};

export default StreakModule;

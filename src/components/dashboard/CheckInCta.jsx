import React from 'react';
import moment from 'moment-timezone';
import { useHistory } from 'react-router-dom';
import { makeStyles, Box, Paper, Typography } from '@material-ui/core';
import useMobile from 'hooks/useMobile';
import Button from 'components/common/Button';
import ROUTES from 'constants/routes';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  accentText: {
    color: COLORS.RED,
  },
}));

const DesktopCheckInCta = () => {
  const classes = useStyles();
  const history = useHistory();
  const date = moment().format('MMM D, YYYY');

  return (
    <Paper elevation={24}>
      <Box
        p={3}
        minHeight={240}
        display="flex"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <Typography variant="h2" gutterBottom>
            You're missing a
            <br />
            check-in for today.
          </Typography>
          <Typography variant="h4" className={classes.accentText}>
            {date}
          </Typography>
        </Box>

        <Box width="50%">
          <Typography varaint="body1" color="textSecondary">
            Add how you felt waking up this morning and
            <br />
            tag the activities you did the day before.
          </Typography>
          <Box mt={3}>
            <Button
              text="Complete Check-in"
              onClick={() => {
                history.push(ROUTES.checkIn);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const MobileCheckInCta = () => {
  const classes = useStyles();
  const history = useHistory();
  const date = moment().format('MMM D, YYYY');

  return (
    <Paper elevation={24}>
      <Box
        p={3}
        minHeight={150}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Typography variant="h2" gutterBottom>
            You're missing a check-in
            <br />
            for today.
          </Typography>
          <Typography variant="h4" className={classes.accentText}>
            {date}
          </Typography>
        </Box>
        <Box mt={5}>
          <Button
            fullWidth
            text="Complete Check-in"
            onClick={() => {
              history.push(ROUTES.checkIn);
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default function CheckInCta() {
  const { isMobile } = useMobile();

  return isMobile ? <MobileCheckInCta /> : <DesktopCheckInCta />;
}

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Switch,
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserState } from 'context/userContext';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';
import { initiateCheckoutSession } from 'services/PlansServices';
import Button from 'components/common/Button';
import { getShape } from 'utils/shape-utils';
import { isSubscriptionActive } from 'utils/subscription-utils';
import appleHealthIcon from 'assets/icons/apple-health.svg';
import fitbitIcon from 'assets/icons/fitbit-icon.svg';
import ouraIcon from 'assets/icons/oura-icon.svg';
import withingsIcon from 'assets/icons/withings-icon.svg';
import whoopIcon from 'assets/icons/whoop-icon.svg';
import { SUBS } from 'constants/subscriptions';

const useStyles = makeStyles((theme) => ({
  discountedPrice: {
    position: 'relative',
    '&::after': {
      content: '"← 20% discount"',
      position: 'absolute',
      left: '100%',
      top: '20%',
      marginLeft: theme.spacing(1),
      minWidth: 100,
      color: COLORS.RED,
      fontSize: theme.typography.subtitle2.fontSize,
      whiteSpace: 'nowrap',
    },
  },
  discountedPriceMobile: {
    position: 'relative',
    '&::after': {
      content: '"20% discount"',
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 100,
      color: COLORS.RED,
      fontSize: theme.typography.subtitle2.fontSize,
      whiteSpace: 'nowrap',
    },
  },
  gridItem: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  gridItemUnderline: {
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
  },
  shapeBulletPoint: {
    marginRight: theme.spacing(1),
    width: 20,
    height: 20,
  },
  background: {
    background: COLORS.WHITE,
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
  },
}));

const PAY_RATE = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

const SHAPE_ID = 'HEXAGON_1';
const SHAPE_COLOR = '#F4D8FE';

const BulletPointItem = ({ text, underline = false }) => {
  const classes = useStyles();
  const Shape = getShape(SHAPE_ID);
  return (
    <Grid
      item
      className={clsx(classes.gridItem, {
        [classes.gridItemUnderline]: underline,
      })}
    >
      <Shape fill={SHAPE_COLOR} className={classes.shapeBulletPoint} />
      <Typography variant="subtitle2">{text}</Typography>
    </Grid>
  );
};

export default function Plans() {
  const classes = useStyles();
  const user = useUserState();
  const userTrialed = user?.stripe?.trialed;
  const isPowerUser = user?.settings?.powerUser;
  const history = useHistory();
  const { isMobile } = useMobile();
  const [error, setError] = useState(null);
  const [paymentRate, setPaymentRate] = useState(PAY_RATE.YEARLY);

  const onSubscribeHandle = async (priceId) => {
    try {
      await initiateCheckoutSession(priceId);
    } catch (e) {
      setError(e.message);
    }
  };

  const onPayRateToggleHandle = () => {
    if (paymentRate === PAY_RATE.YEARLY) {
      setPaymentRate(PAY_RATE.MONTHLY);
    } else {
      setPaymentRate(PAY_RATE.YEARLY);
    }
  };

  useEffect(() => {
    if (isSubscriptionActive(user)) {
      history.push(ROUTES.dashboard);
    }
  }, [user, history]);

  return (
    <Box mb={4}>
      <Helmet>
        <title>Spindol - Subscriptions</title>
      </Helmet>
      <Container>
        <Box
          className={classes.background}
          py={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="overline" align="center">
            Ready to start with Spindol?
          </Typography>

          <Box mt={2}>
            <Typography variant="subtitle1">
              Choose the package that suits you.
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color={
                paymentRate === PAY_RATE.MONTHLY
                  ? 'textPrimary'
                  : 'textSecondary'
              }
              display="inline"
            >
              Pay Monthly
            </Typography>
            <Switch
              checked={paymentRate === PAY_RATE.YEARLY}
              onChange={onPayRateToggleHandle}
              disableRipple
              disableFocusRipple
              disableTouchRipple
            />
            <Typography
              className={clsx({
                [classes.discountedPrice]: !isMobile,
                [classes.discountedPriceMobile]: isMobile,
              })}
              variant="h6"
              color={
                paymentRate === PAY_RATE.YEARLY
                  ? 'textPrimary'
                  : 'textSecondary'
              }
              display="inline"
            >
              Pay Yearly
            </Typography>
          </Box>
          <Box minHeight={5}>
            {error ? (
              <Typography variant="subtitle1" color="error">
                {error}
              </Typography>
            ) : null}
          </Box>
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'revert'}
            justifyContent="center"
          >
            <Box m={3}>
              <Paper elevation={24}>
                <Box
                  p={3}
                  pt={5}
                  minHeight={565}
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <Box maxWidth={250}>
                        <Typography variant="h5" gutterBottom>
                          Standard
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          For people that want to track their sleep and
                          activities.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1">
                        ${SUBS.standard[paymentRate].price}
                      </Typography>
                      <Typography variant="subtitle1">
                        per month{' '}
                        {paymentRate === PAY_RATE.YEARLY
                          ? ' (paid yearly)'
                          : ''}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box display="flex" justifyContent="center">
                        <Button
                          text={
                            userTrialed
                              ? 'Subscribe'
                              : `Start ${isPowerUser ? 30 : 14} Day Trial`
                          }
                          onClick={() => {
                            onSubscribeHandle(
                              SUBS.standard[paymentRate].priceId
                            );
                          }}
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        style={{ marginBottom: 16 }}
                      >
                        Included
                      </Typography>
                      <Grid container direction="column" spacing={2}>
                        <BulletPointItem text="Mood & Activity Tracking" />
                        <BulletPointItem text="Daily Journal" />
                        <BulletPointItem text="Sleep Tracker Integration" />
                        <BulletPointItem text="Sleep & Activities Analytics" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
            {/* <Box m={3}>
              <Paper elevation={24}>
                <Box
                  p={3}
                  pt={5}
                  minHeight={565}
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <Box maxWidth={250}>
                        <Typography variant="h5" gutterBottom>
                          Premium
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          For people that want the guidance of a sleep coach.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1">
                        ${SUBS.premium[paymentRate].price}
                      </Typography>
                      <Typography variant="subtitle1">
                        per month{' '}
                        {paymentRate === PAY_RATE.YEARLY
                          ? ' (paid yearly)'
                          : ''}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box display="flex" justifyContent="center">
                        <Button
                          text={
                            userTrialed
                              ? 'Subscribe'
                              : `Start ${isPowerUser ? 30 : 14} Day Trial`
                          }
                          onClick={() => {
                            onSubscribeHandle(
                              SUBS.premium[paymentRate].priceId
                            );
                          }}
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        style={{ marginBottom: 16 }}
                      >
                        Included
                      </Typography>
                      <Grid container direction="column" spacing={2}>
                        <BulletPointItem text="Mood & Activity Tracking" />
                        <BulletPointItem text="Daily Journal" />
                        <BulletPointItem text="Sleep Tracker Integration" />
                        <BulletPointItem text="Sleep & Activities Analytics" />
                        <BulletPointItem
                          text="Sleep Coaching Access*"
                          underline
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box> */}
          </Box>
          <Box mt={5} maxWidth={647} width="100%">
            <Paper elevation={24} style={{ width: '100%' }}>
              <Box p={3} width="100%">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      Currently Supporting
                    </Typography>
                    <Box display="flex">
                      <Box
                        m={3}
                        ml={0}
                        mb={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={ouraIcon}
                          alt="Oura Icon"
                          width="40"
                          height="40"
                        />
                        <Typography variant="body1">Oura</Typography>
                      </Box>
                      <Box
                        m={3}
                        ml={0}
                        mb={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={withingsIcon}
                          alt="Withings Icon"
                          width="40"
                          height="40"
                        />
                        <Typography variant="body1">Withings</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Coming Soon</Typography>
                    <Box display="flex">
                      <Box
                        m={3}
                        ml={0}
                        mb={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={fitbitIcon}
                          alt="Fitbit Icon"
                          width="40"
                          height="40"
                        />
                        <Typography variant="body1">Fitbit</Typography>
                      </Box>
                      <Box
                        m={3}
                        ml={0}
                        mb={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={whoopIcon}
                          alt="Whoop Icon"
                          width="40"
                          height="40"
                        />
                        <Typography variant="body1">Whoop</Typography>
                      </Box>
                      <Box
                        m={3}
                        ml={0}
                        mb={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={appleHealthIcon}
                          alt="Apple Health Icon"
                          width="40"
                          height="40"
                        />
                        <Typography variant="body1">Apple Health</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
          {/* <Box my={3} maxWidth={700}>
            <Typography variant="body1">
              * Coaches are currently located in the USA. Be aware when
              communicating with Coaches that there may be timezone differences
              which effect response times.
            </Typography>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
}

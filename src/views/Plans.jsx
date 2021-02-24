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
import Section from 'components/common/Section';
import { getShape } from 'utils/shape-utils';
import { isSubscriptionActive } from 'utils/subscription-utils';

const useStyles = makeStyles((theme) => ({
  discountedPrice: {
    position: 'relative',
    '&::after': {
      content: '"← 20% discount"',
      position: 'absolute',
      left: '100%',
      top: 0,
      marginLeft: theme.spacing(1),
      minWidth: 100,
      color: COLORS.DARK_BLUE,
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
      color: COLORS.DARK_BLUE,
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

const SUBS = {
  standard: {
    monthly: {
      price: 9.99,
      priceId: 'price_1INSIJHTjrDKdTifDV9OnFf4',
    },
    yearly: {
      price: 7.99,
      priceId: 'price_1INhW5HTjrDKdTifTVedZayE',
    },
  },
  premium: {
    monthly: {
      price: 29.99,
      priceId: 'price_1INSIcHTjrDKdTifa25zUBB2',
    },
    yearly: {
      price: 23.99,
      priceId: 'price_1INhV3HTjrDKdTifxiXiWciP',
    },
  },
};

const SHAPE_ID = 'HEXAGON_1';
const SHAPE_COLOR = '#F4D8FE';

const BulletPointItem = ({ text, underline = false }) => {
  const classes = useStyles();
  const Shape = getShape(SHAPE_ID);
  return (
    <Grid
      item
      className={clsx(classes.gridItem, { [classes.gridItemUnderline]: underline })}
    >
      <Shape fill={SHAPE_COLOR} className={classes.shapeBulletPoint} />
      <Typography variant="subtitle2">{text}</Typography>
    </Grid>
  );
};

export default function Plans() {
  const classes = useStyles();
  const user = useUserState();
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
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
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
            <Box mt={2} justifyContent="center">
              <Typography
                variant="subtitle1"
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
                variant="subtitle1"
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
          </Box>
          <Box mt={2} minHeight={5}>
            {error ? (
              <Typography variant="subtitle1" color="error">
                {error}
              </Typography>
            ) : null}
          </Box>
          <Box
            mt={2}
            display="flex"
            flexDirection={isMobile ? 'column' : 'revert'}
            justifyContent="center"
          >
            <Box m={3}>
              <Paper elevation={24}>
                <Box
                  p={3}
                  pt={5}
                  minHeight={510}
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
                          activities only.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1">
                        ${SUBS.standard[paymentRate].price}
                      </Typography>
                      <Typography variant="subtitle1">per month</Typography>
                    </Grid>
                    <Grid item>
                      <Box display="flex" justifyContent="center">
                        <Button
                          text="Start 14 Day Trial"
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
                        <BulletPointItem text="Sleep Tracker Integration" />
                        <BulletPointItem text="Sleep & Activities Analytics" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
            <Box m={3}>
              <Paper elevation={24}>
                <Box
                  p={3}
                  pt={5}
                  minHeight={510}
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
                      <Typography variant="subtitle1">per month</Typography>
                    </Grid>
                    <Grid item>
                      <Box display="flex" justifyContent="center">
                        <Button
                          text="Start 14 Day Trial"
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
                        <BulletPointItem text="Sleep Tracker Integration" />
                        <BulletPointItem text="Sleep & Activities Analytics" />
                        <BulletPointItem text="Sleep Coaching Access" underline />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

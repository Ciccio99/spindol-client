import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import {
  redirectToCustomerPortal,
  onSubscriptionComplete,
} from 'services/PlansServices';
import { useUserDispatch } from 'context/userContext';
import { getUserMe } from 'services/UserServices';
import Button from 'components/common/Button';
import Section from 'components/common/Section';
import { ReactComponent as SleepingCat } from 'assets/sleepy-kitty.svg';
import ROUTES from 'constants/routes';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  billingButton: {
    color: COLORS.DARK_BLUE,
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
}));

export default function PlansSuccess() {
  const { sessionId } = useParams();
  const history = useHistory();
  const dispatchUser = useUserDispatch();
  const classes = useStyles();
  const [error, setError] = React.useState(null);

  const onToDashboardHandle = () => {
    history.push(ROUTES.home);
  };

  const onManageBillingHandle = async () => {
    try {
      await redirectToCustomerPortal(sessionId);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (sessionId) {
      (async () => {
        try {
          await onSubscriptionComplete(sessionId);
          // Provision app after provisioning user on backend
          const updatedUser = await getUserMe();
          dispatchUser({
            type: 'USER_UPDATE',
            user: updatedUser,
          });
        } catch (e) {
          setError(e.message);
        }
      })();
    }
  }, [sessionId, dispatchUser]);

  return (
    <Box mb={4}>
      <Helmet>
        <title>Spindol - Subscriptions</title>
      </Helmet>
      <Container>
        <Section>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box p={3} mb={2} minHeight={5}>
              {error ? (
                <Typography variant="subtitle1" color="error">
                  {error}
                </Typography>
              ) : null}
            </Box>
            <Box
              p={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="overline" align="center">
                Thank you for subscribing!
              </Typography>
              <Box mt={3} maxWidth={400} width="100%">
                <SleepingCat width="100%" />
              </Box>
              <Box mt={3} display="flex" justifyContent="center">
                <Button text="Go to Dashboard" onClick={onToDashboardHandle} />
              </Box>
              <Box mt={3} display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  onClick={onManageBillingHandle}
                  className={classes.billingButton}
                >
                  Manage Billing
                </Typography>
              </Box>
            </Box>
          </Box>
        </Section>
      </Container>
    </Box>
  );
}

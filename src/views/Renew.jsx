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
import LinkText from 'components/common/LinkText';

export default function Renew() {
  const user = useUserState();
  const history = useHistory();

  const onGoToPlansHandle = () => {
    history.push(ROUTES.plans);
  };

  const onGoToAccountHandle = () => {
    history.push(ROUTES.account);
  };

  useEffect(() => {
    if (isSubscriptionActive(user)) {
      history.push(ROUTES.home);
    }
  });

  return (
    <Box mb={4}>
      <Helmet>
        <title>Spindol - Renew Subscription</title>
      </Helmet>
      <Container>
        <Section>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Paper elevation={24}>
              <Box p={3} display="flex" flexDirection="column">
                <Typography variant="h1" gutterBottom>
                  Please renew your subscription to continue using Spindol.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  You can still access your account settings and billing
                  settings while unsubscribed.
                </Typography>

                <Box mt={6} mb={6}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        text="See Subscription Plans"
                        onClick={onGoToPlansHandle}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        text="Manage Account"
                        onClick={onGoToAccountHandle}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <div>
                  <Typography variant="subtitle1" display="inline">
                    If this renewal request is an error, please contact us at {' '}
                  </Typography>
                  <LinkText to="mailto:support@spindol.com" external inline>
                    support@spindol.com
                  </LinkText>
                </div>
              </Box>
            </Paper>
          </Box>
        </Section>
      </Container>
    </Box>
  );
}

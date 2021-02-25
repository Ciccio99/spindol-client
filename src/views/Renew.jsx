import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import Button from 'components/common/Button';
import LinkText from 'components/common/LinkText';
import Section from 'components/common/Section';
import ROUTES from 'constants/routes';
import { useUserState } from 'context/userContext';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { isSubscriptionActive } from 'utils/subscription-utils';

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
                    If this renewal request is an error, please contact us at{' '}
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

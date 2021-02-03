import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet-async';
import backToTopArrow from 'assets/ic_back-to-top.svg';
import sleepingCatSvg from 'assets/icons/sleeping-cat.svg';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';

const useStyles = makeStyles((theme) => ({
  centerImage: {
    maxHeight: 400,
    maxWidth: 400,
    height: '100%',
    width: '100%',
  },
  backArrow: {
    marginRight: theme.spacing(1),
    transform: 'rotate(-90deg)',
  },
  backLink: {
    textDecoration: 'none',
    color: COLORS.BLACK,
  },
}));

export default function Custom404() {
  const classes = useStyles();

  return (
    <Box
      p={4}
      width="100vw"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Helmet>
        <title>Spindol - 404</title>
      </Helmet>
      <Typography variant="overline" align="center">
        404
      </Typography>
      <Box maxHeight={350} maxWidth={350} my={4}>
        <img
          src={sleepingCatSvg}
          className={classes.centerImage}
          height="100%"
          width="100%"
          alt="Sleeping Cat"
        />
      </Box>
      <Typography variant="overline" align="center">
        Looks like you caught us cat napping!
      </Typography>
      <Box mt={14}>
        <NavLink to={ROUTES.home} className={classes.backLink}>
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <img
                  className={classes.backArrow}
                  width={46}
                  height={46}
                  src={backToTopArrow}
                  alt="Back to top arrow"
                />
                <Typography variant="h2" align="center" className={classes.backLink}>
                  Let's get you back home
                </Typography>
              </Box>
            </Box>
        </NavLink>
      </Box>
    </Box>
  );
}

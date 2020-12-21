import React from 'react';
import {
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Copyright from 'components/copyright/Copyright';
import useMedium from 'hooks/useMedium';
import useMobile from 'hooks/useMobile';
import { useUserState } from 'context/userContext';
import { HypnosYellowIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    width: '100%',
  },
  footerMedium: {
    marginBottom: '78px',
  },
  footerInner: {
    backgroundColor: COLORS.WHITE,
    // marginTop: theme.spacing(18),
    minHeight: '72px',
    padding: `0 ${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center',
  },
  footerInnerMobile: {
    minHeight: '280px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  navLink: {
    color: COLORS.BLACK,
    textDecoration: 'none',
  },
  navLinkMobile: {
    padding: '12px 0',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Footer = () => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return (<FooterMobile />);
  }

  return (<FooterDesktop />);
};

const FooterDesktop = () => {
  const classes = useStyles();
  const { isMedium } = useMedium();
  const user = useUserState();
  return (
    <footer className={clsx(classes.footer, { [classes.footerMedium]: (isMedium && user._id) })}>
      <div className={clsx(classes.footerInner)}>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <div className={classes.logoContainer}>
            {/* <Typography variant="h6">Hypnos.ai</Typography> */}
            <HypnosYellowIcon />
          </div>
          <div>
            <Grid container spacing={4} justify="center">
              <Grid item xs={12} sm="auto"><FooterLink to="https://community.hypnos.ai" external>Community</FooterLink></Grid>
              <Grid item xs={12} sm="auto"><FooterLink to="/terms-of-service">Terms of Service</FooterLink></Grid>
              <Grid item xs={12} sm="auto"><FooterLink to="/privacy-policy">Privacy Policy</FooterLink></Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={4} justify="flex-end">
              <Grid item xs={12} sm="auto"><Copyright /></Grid>
              <Grid item xs={12} sm="auto"><FooterLink to="https://twitter.com/hypnos_ai" external>Twitter</FooterLink></Grid>
              <Grid item xs={12} sm="auto"><FooterLink to="https://www.facebook.com/hypnosai/" external>Facebook</FooterLink></Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </footer>
  );
};

const FooterMobile = () => {
  const classes = useStyles();
  const user = useUserState();

  return (
    <footer className={clsx(classes.footer, { [classes.footerMedium]: (!!user._id) })}>
      <div className={clsx(classes.footerInner, classes.footerInnerMobile)}>
        <Typography variant="h6">Hypnos.ai</Typography>
        <div>
          <div style={{ margin: '12px 0' }}><FooterLink to="https://community.hypnos.ai" external isMobile>Community</FooterLink></div>
          <div style={{ margin: '12px 0' }}><FooterLink to="/terms-of-service" isMobile>Terms of Service</FooterLink></div>
          <div style={{ margin: '12px 0' }}><FooterLink to="/privacy-policy" isMobile>Privacy Policy</FooterLink></div>
        </div>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Copyright />
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <div style={{ margin: '0 12px' }}><FooterLink to="https://twitter.com/hypnos_ai" external isMobile>Twitter</FooterLink></div>
            <div style={{ margin: '0 12px' }}><FooterLink to="https://www.facebook.com/hypnosai/" external isMobile>Facebook</FooterLink></div>
          </Box>
        </Box>

      </div>
    </footer>
  );
};

const FooterLink = ({
  external, to, children, isMobile,
}) => {
  const classes = useStyles();

  if (external) {
    return (
      <a href={to} className={clsx(classes.navLink, { [classes.navLinkMobile]: isMobile })} target="_blank" rel="noopener noreferrer">
        <Typography variant="body1">
          {children}
        </Typography>
      </a>
    );
  }
  return (
    <NavLink to={to} className={clsx(classes.navLink, { [classes.navLinkMobile]: isMobile })}>
      <Typography variant="body1">
        {children}
      </Typography>
    </NavLink>
  );
};
export default React.memo(Footer);

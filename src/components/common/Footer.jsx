import React from 'react';
import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Copyright from 'components/common/Copyright';
import useMobile from 'hooks/useMobile';
import { SpindolLogoIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    width: '100%',
    backgroundColor: COLORS.WHITE,
    zIndex: 1,
  },
  footerInner: {
    backgroundColor: COLORS.WHITE,
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
    return <FooterMobile />;
  }

  return <FooterDesktop />;
};

const FooterDesktop = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={clsx(classes.footerInner)}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className={classes.logoContainer}>
            <SpindolLogoIcon />
          </div>
          <div>
            <Grid container spacing={4} justify="center">
              <Grid item xs={8} md="auto">
                <FooterLink to={ROUTES.termsOfService} external>
                  Terms of Service
                </FooterLink>
              </Grid>
              <Grid item xs={8} md="auto">
                <FooterLink to={ROUTES.privacyPolicy} external>
                  Privacy Policy
                </FooterLink>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={4} justify="flex-end">
              <Grid item xs={8} md="auto">
                <FooterLink to={ROUTES.twitter} external>
                  Twitter
                </FooterLink>
              </Grid>
              <Grid item xs={8} md="auto">
                <FooterLink to={ROUTES.twitter} external>
                  Instagram
                </FooterLink>
              </Grid>
              <Grid item xs={8} md="auto">
                <FooterLink to={ROUTES.facebook} external>
                  Facebook
                </FooterLink>
              </Grid>
              <Grid item xs={8} md="auto">
                <Copyright />
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </footer>
  );
};

const FooterMobile = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={clsx(classes.footerInner, classes.footerInnerMobile)}>
        <SpindolLogoIcon />
        <div>
          <div style={{ margin: '12px 0' }}>
            <FooterLink to={ROUTES.termsOfService} external isMobile>
              Terms of Service
            </FooterLink>
          </div>
          <div style={{ margin: '12px 0' }}>
            <FooterLink to={ROUTES.privacyPolicy} isMobile>
              Privacy Policy
            </FooterLink>
          </div>
        </div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <div>
              <FooterLink to={ROUTES.twitter} external isMobile>
                Twitter
              </FooterLink>
            </div>
            <div style={{ margin: '0 12px' }}>
              <FooterLink to={ROUTES.instagram} external isMobile>
                Instagram
              </FooterLink>
            </div>
            <div style={{ margin: '0 12px' }}>
              <FooterLink to={ROUTES.facebook} external isMobile>
                Facebook
              </FooterLink>
            </div>
          </Box>
        </Box>
        <Copyright />
      </div>
    </footer>
  );
};

const FooterLink = ({ external, to, children, isMobile }) => {
  const classes = useStyles();

  if (external) {
    return (
      <a
        href={to}
        className={clsx(classes.navLink, { [classes.navLinkMobile]: isMobile })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="body1">{children}</Typography>
      </a>
    );
  }
  return (
    <NavLink
      to={to}
      className={clsx(classes.navLink, { [classes.navLinkMobile]: isMobile })}
    >
      <Typography variant="body1">{children}</Typography>
    </NavLink>
  );
};
export default React.memo(Footer);

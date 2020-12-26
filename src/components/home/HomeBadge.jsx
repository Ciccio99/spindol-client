import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMobile from 'hooks/useMobile';
import useScrollY from 'hooks/useScrollY';
import awesomeFace from 'assets/emoticons/awesome-face.svg';
import backToTopArrow from 'assets/ic_back-to-top.svg';

const useStyles = makeStyles(() => ({
  badge: {
    position: 'fixed',
    bottom: 25,
    right: 25,
    zIndex: 1,
    pointerEvents: 'none',
  },
  activeButton: {
    pointerEvents: 'auto',
    cursor: 'pointer',
  },
  centralImage: {
    position: 'absolute',
    top: 48,
    left: 48,
    transition: 'all 0.25s ease-in-out',
    animation: '$grow 0.5s ease-in-out',
  },
  '@keyframes grow': {
    '0%': { transform: 'scale(0)' },
    '65%': { transform: 'scale(1.10)' },
    '100%': { transform: 'scale(1)' },
  },
  svg: {
    zIndex: 1,
    width: 160,
    height: 160,
  },
  svgSleepText: {
    fontFamily: 'Antic Didone',
    fontSize: '32px',
    fontWeight: 400,
    letterSpacing: 16,
  },
  svgBackText: {
    fontFamily: 'Antic Didone',
    fontSize: '36px',
    fontWeight: 400,
    letterSpacing: 17,
  },
}));

const HomeBadge = () => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const { isScrolled } = useScrollY(300);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMobile) {
    return null;
  }

  return (
    <Box className={classes.badge}>
      {
        isScrolled
          ? (
            <Box onClick={scrollToTop}>
              <img className={clsx(classes.centralImage, classes.activeButton)} width={64} height={64} src={backToTopArrow} alt="Back to top arrow" />
              <BackTopCircleText />
            </Box>
          )
          : (
            <>
              <img className={classes.centralImage} width={64} height={64} src={awesomeFace} alt="awesome face" />
              <SleepCircleText />
            </>
          )
      }
    </Box>
  );
};

const SleepCircleText = (props) => {
  const classes = useStyles();

  return (
    <svg viewBox="50 50 400 400" className={classes.svg} {...props}>
      <defs>
        <path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle">
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="60s"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </path>
      </defs>
      <text className={classes.svgSleepText} dy="55">
        {/* <!-- textLength (essentially the circumference of the circle) is used as an alternative to letter-spacing for Firefox, which currently doesn't support letter-spacing for SVG --> */}
        <textPath xlinkHref="#textcircle">Let me sleep. Let me sleep. Let me sleep.</textPath>
      </text>
    </svg>
  );
};

const BackTopCircleText = (props) => {
  const classes = useStyles();

  return (
    <svg viewBox="50 50 400 400" className={classes.svg} {...props}>
      <defs>
        <path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle">
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="60s"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </path>
      </defs>
      <text className={classes.svgBackText} dy="55">
        <textPath xlinkHref="#textcircle">Back to top. Back to top. Back to top.</textPath>
      </text>
    </svg>
  );
};
export default HomeBadge;

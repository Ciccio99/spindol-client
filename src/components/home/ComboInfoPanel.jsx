import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useBreakpoint from 'hooks/useBreakpoint';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';
import dataScientistSvg from 'assets/home/img_data-scientist.svg';
import sleepTherapistSvg from 'assets/home/img_sleep-therapist.svg';
import sleepJournalSvg from 'assets/home/img_diary.svg';

const useStyles = makeStyles(() => ({
  heroBackground: {
    background: COLORS.WHITE,
  },
  mobileImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 270,
    opacity: 0,
    margin: '0 auto',
    transition: 'opacity 1s ease-in-out',
  },
  visible: {
    opacity: 1,
  },
}));

const pDict = {
  xs: 3,
  sm: 3,
  md: 3,
  lg: 6,
  xl: 6,
};

const ComboInfoPanel = () => {
  const classes = useStyles();
  const { breakpoint } = useBreakpoint();
  const { isMobile } = useMobile();
  const px = React.useMemo(() => pDict[breakpoint], [breakpoint]);

  return (
    <Box p={px} pt={px + 1} pb={0} width="100%" className={classes.heroBackground}>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Typography variant="overline" style={{ maxWidth: 540 }}>
          Hypnos is like having a Data Scientist, Sleep Therapist, and Diary all in one.
        </Typography>
      </Box>
      <Box mt={10}>
        {
          isMobile
            ? <ComboImagesMobile />
            : <ComboImagesDesktop />
        }
      </Box>
    </Box>
  );
};

const ComboImagesDesktop = () => (
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
        <img alt="Data Scientist" src={dataScientistSvg} style={{ maxWidth: '100%' }} />
      </Box>
    </Grid>
    <Grid item xs={4}>
      <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
        <img alt="Sleep Therapist" src={sleepTherapistSvg} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </Grid>
    <Grid item xs={4}>
      <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
        <img alt="Sleep Diary" src={sleepJournalSvg} style={{ maxWidth: '100%' }} />
      </Box>
    </Grid>
  </Grid>
);

const ComboImagesMobile = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const maxIndex = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((oldIndex) => {
        const newIndex = oldIndex + 1;

        if (newIndex <= maxIndex) {
          return newIndex;
        }
        return 0;
      });
    }, 3000);
    return () => { clearInterval(interval); };
  }, []);

  return (
    <Box height={230} position="relative">
      <img className={clsx(classes.mobileImage, { [classes.visible]: index === 0 })} alt="Data Scientist" src={dataScientistSvg} />
      <img className={clsx(classes.mobileImage, { [classes.visible]: index === 1 })} alt="Sleep Therapist" src={sleepTherapistSvg} />
      <img className={clsx(classes.mobileImage, { [classes.visible]: index === 2 })} alt="Sleep Diary" src={sleepJournalSvg} />
    </Box>
  );
};
export default ComboInfoPanel;

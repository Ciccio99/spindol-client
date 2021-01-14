import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const PROMPTS = [
  'Last night, I dreamed...',
  'Yesterday, I felt...',
  'Last night, I went to...',
  'Today, I thought of...',
];

const useStyles = makeStyles(() => ({
  fadeText: {
    animationName: '$fadeText',
    animationDuration: (props) => props.timeInterval,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  '@keyframes fadeText': {
    '0%': { opacity: 0 },
    '25%': { opacity: 1 },
    '75%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
}));


const ShiftingPrompt = ({ timeInterval = 4000, ...props }) => {
  const classes = useStyles({ timeInterval });
  const [index, setIndex] = useState(0);

  const incrementIndex = (delta = 1) => {
    setIndex((prevIndex) => (prevIndex + PROMPTS.length + delta) % PROMPTS.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      incrementIndex();
    }, timeInterval);
    return () => { clearInterval(interval); };
  }, [timeInterval]);

  return (
    <Typography
      className={clsx(classes.fadeText)}
      {...props}
    >
      {PROMPTS[index]}
    </Typography>
  );
};

export default ShiftingPrompt;

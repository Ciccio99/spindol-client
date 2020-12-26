import { useEffect, useState } from 'react';
import BREAK_POINTS from 'constants/breakpoints';

const getBreakpoint = (width) => {
  const keys = Object.keys(BREAK_POINTS);

  for (let i = 0; i < keys.length; i += 1) {
    const currKey = keys[i];
    const nextKey = keys[i + 1];
    const currBp = BREAK_POINTS[currKey];
    const nextBp = nextKey ? BREAK_POINTS[nextKey] : 10000;
    if (width >= currBp && width < nextBp) {
      return currKey;
    }
  }
  return 'md';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const bp = getBreakpoint(width);
      if (breakpoint !== bp) {
        setBreakpoint(bp);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });
  return { breakpoint };
};

export default useBreakpoint;

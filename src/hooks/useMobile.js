import useMediaQuery from 'hooks/useMediaQuery';
import BREAKPOINTS from 'constants/breakpoints';

const useMobile = () => {
  const isMobile = useMediaQuery(BREAKPOINTS.sm);

  return { isMobile };
};

export default useMobile;

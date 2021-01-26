import useMediaQuery from 'hooks/useMediaQuery';
import BREAKPOINTS from 'constants/breakpoints';

const useMedium = () => {
  const isMedium = useMediaQuery(BREAKPOINTS.md);

  return { isMedium };
};

export default useMedium;

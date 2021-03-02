import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { updateIntercom } from 'next-intercom';

const usePageTracker = () => {
  const { listen } = useHistory();
  useEffect(() => {
    const unlisten = listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
      updateIntercom(undefined);
    });

    return unlisten;
  }, [listen]);
};

export default usePageTracker;

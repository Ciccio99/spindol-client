import ReactGA from 'react-ga';
import config from 'config';

export const initGA = () => {
  if (config?.ga?.trackingId) {
    ReactGA.initialize(config.ga.trackingId);
  } else {
    ReactGA.initialize('foo', { testMode: true });
  }
};

export const setUserId = (userId) => {
  ReactGA.set({ userId });
};

export const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

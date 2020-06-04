import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import config from 'config';
import HypnosTheme from './constants/HypnosTheme';
import * as serviceWorker from './serviceWorker';
import App from './App';

if (config.ga.trackingId) {
  ReactGA.initialize(config.ga.trackingId);
  console.log('GA enabled');
} else {
  ReactGA.initialize('foo', { testMode: true });
  console.log('GA TEST enabled');
}
if (config.hotjar.trackingId) {
  hotjar.initialize(config.hotjar.trackingId);
  console.log('hotjar enabled');
}

ReactDOM.render(
  <React.StrictMode>
    <HypnosTheme>
      <CssBaseline>
        <App />
      </CssBaseline>
    </HypnosTheme>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

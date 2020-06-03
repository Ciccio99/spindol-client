import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import HypnosTheme from './constants/HypnosTheme';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import config from 'config';

if (config.ga.trackingId) {
  console.log(config.ga.trackingId);
  ReactGA.initialize(config.ga.trackingId);
} else {
  ReactGA.initialize('foo', { testMode: true });
}
if (config.hotjar.trackingId) {
  hotjar.initialize(config.hotjar.trackingId);
}

ReactDOM.render(
  <React.StrictMode>
    <HypnosTheme>
      <CssBaseline>
        <App />
      </CssBaseline>
    </HypnosTheme>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

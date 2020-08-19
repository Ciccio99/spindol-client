import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import { HelmetProvider } from 'react-helmet-async';
import config from 'config';
import HypnosTheme from './constants/HypnosTheme';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {
  UserProvider,
} from 'context/userContext';
import {
  AlertSystemProvider,
} from 'context/alertSystemContext';
import AlertSystemModule from 'components/alertSystem/AlertSystemModule';

if (config?.ga?.trackingId) {
  ReactGA.initialize(config.ga.trackingId);
} else {
  ReactGA.initialize('foo', { testMode: true });
}
if (config?.hotjar?.trackingId) {
  hotjar.initialize(config.hotjar.trackingId);
}
if (config?.crisp?.id) {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = config.crisp.id;

  (function() {
    var d = document;
    var s = d.createElement("script");

    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
  window.$crisp.push(["safe", true]);
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <HypnosTheme>
        <CssBaseline>
          <UserProvider>
            <AlertSystemProvider>
              <App />
              <AlertSystemModule />
            </AlertSystemProvider>
          </UserProvider>
        </CssBaseline>
      </HypnosTheme>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

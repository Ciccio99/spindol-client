import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import {
  SessionProgressProvider,
} from 'context/sessionProgressContext';
import AlertSystemModule from 'components/alertSystem/AlertSystemModule';
import { initGA } from 'utils/Tracking';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query-devtools";

// Initialize Google analytics tracking
initGA();

const queryCache = new QueryCache();

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
          <ReactQueryCacheProvider queryCache={queryCache}>
            <UserProvider>
              <AlertSystemProvider>
                <SessionProgressProvider>
                  <App />
                </SessionProgressProvider>
                <AlertSystemModule />
              </AlertSystemProvider>
            </UserProvider>
            <ReactQueryDevtools />
          </ReactQueryCacheProvider>
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hotjar } from 'react-hotjar';
import { HelmetProvider } from 'react-helmet-async';
import config from 'config';
import { UserProvider } from 'context/userContext';
import { AlertSystemProvider } from 'context/alertSystemContext';
import AlertSystemModule from 'components/common/AlertSystemModule';
import { initGA } from 'utils/Tracking';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HypnosTheme from './constants/HypnosTheme';

// Initialize Google analytics tracking
initGA();

const queryCache = new QueryCache();

if (config?.hotjar?.trackingId) {
  hotjar.initialize(config.hotjar.trackingId);
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <HypnosTheme>
        <CssBaseline>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <UserProvider>
              <AlertSystemProvider>
                <App />
                <AlertSystemModule />
              </AlertSystemProvider>
            </UserProvider>
            <ReactQueryDevtools />
          </ReactQueryCacheProvider>
        </CssBaseline>
      </HypnosTheme>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

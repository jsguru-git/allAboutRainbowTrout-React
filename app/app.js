/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./fonts/GROBOLD.ttf';
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/logo-1.png';
import '!file-loader?name=[name].[ext]!./images/logo-2.png';
import '!file-loader?name=[name].[ext]!./images/logo-3.png';
import '!file-loader?name=[name].[ext]!./images/bubble.png';
import '!file-loader?name=[name].[ext]!./images/button_home.png';
import '!file-loader?name=[name].[ext]!./images/button_restart.png';
import '!file-loader?name=[name].[ext]!./images/window_home.png';
import '!file-loader?name=[name].[ext]!./images/window_learn.png';
import '!file-loader?name=[name].[ext]!./images/tile_play.png';
import '!file-loader?name=[name].[ext]!./images/tile_learn.png';
import '!file-loader?name=[name].[ext]!./images/waves.svg';
import '!file-loader?name=[name].[ext]!./images/game_window_bkgd.jpg';
import '!file-loader?name=[name].[ext]!./images/fish_jumping_animation.gif';
import '!file-loader?name=[name].[ext]!./images/hud_score.png';
import '!file-loader?name=[name].[ext]!./images/hud_energy.png';
import '!file-loader?name=[name].[ext]!./images/hud_time.png';
import '!file-loader?name=[name].[ext]!./images/3stars.png';
import '!file-loader?name=[name].[ext]!./images/3stars_off.png';
import '!file-loader?name=[name].[ext]!./images/bkgd_panel.png';
import '!file-loader?name=[name].[ext]!./images/fishingPole.png';
import '!file-loader?name=[name].[ext]!./images/loading.gif';

import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions


import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js')
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

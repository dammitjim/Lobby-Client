const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Configstore = require('configstore');
const conf = new Configstore('fidget');

import authOptions from './api_auth';

/**
 * Handles the callback from Twitch on 'will-navigate'
 * @param  string url
 * @return void
 */
function handleAuthCallback(url) {
  const raw = /code=([^&]*)/.exec(url) || null;
  const code = (raw && raw.length > 1) ? raw[1] : null;
  conf.set('auth_code', code);
}


/**
 * Launches a twitch authentication window
 */
export function InitiateAuthFlow() {
  if (conf.get('auth_code') === undefined) {
    let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
    let authURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code';

    authURL = authURL + '&client_id=' + authOptions.client_id + '&redirect_uri=' + authOptions.redirect_url;
    authWindow.loadURL(authURL);
    authWindow.show();

    authWindow.webContents.on('will-navigate', (e, url) => {
      handleAuthCallback(url);
      e.preventDefault();
      authWindow.close();
    });

    authWindow.on('close', () => {
      authWindow = null;
    }, false);
  } else {
    console.log('Auth code already defined as: ' + conf.get('auth_code'));
  }
}


/**
 * Checks to see if an authentication code has been set for the active session
 */
export function IsAuthenticated() {
  return (conf.get('auth_code') === undefined) ? false : true;
}

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Configstore = require('configstore');
const conf = new Configstore('fidget');
const querystring = require('querystring');

const scopes = ['user_read', 'channel_read'];

console.log(conf.get('auth_code'));

import authOptions from './api_auth';
import https from 'https';

/**
 * Handles the callback from Twitch on 'will-navigate'
 * @param  string url
 * @return void
 */
function handleAuthCallback(url, callback) {
  const raw = /code=([^&]*)/.exec(url) || null;
  const c = (raw && raw.length > 1) ? raw[1] : null;

  const postData = querystring.stringify({
    client_id: authOptions.client_id,
    client_secret: authOptions.client_secret,
    grant_type: 'authorization_code',
    redirect_uri: authOptions.redirect_url,
    code: c,
  });

  const reqData = {
    host: 'api.twitch.tv',
    path: '/kraken/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'accept': '*/*',
    },
    method: 'POST',
  };

  const req = https.request(reqData, (response) => {
    let data = '';
    // Load data into chunks and append to the data
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      callback(JSON.parse(data));
    });
  });

  req.write(postData);
  req.end();
  // conf.set('auth_code', c);
}


/**
 * Launches a twitch authentication window
 */
export function InitiateAuthFlow() {
  if (conf.get('auth_code') === undefined) {
    let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
    let authURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code';
    authURL += ('&scope=' + scopes.join(' '));

    authURL = authURL + '&client_id=' + authOptions.client_id + '&redirect_uri=' + authOptions.redirect_url;
    authWindow.loadURL(authURL);
    authWindow.show();

    authWindow.webContents.on('will-navigate', (e, url) => {
      if (url.slice(0, 16) === 'http://localhost') {
        handleAuthCallback(url, (data) => {
          conf.set('auth_code', data.access_token);
        });
        e.preventDefault();
        authWindow.close();
      }
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

export function code() {
  return conf.get('auth_code');
}

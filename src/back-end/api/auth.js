import https from 'https';
import querystring from 'querystring';
import electron from 'electron';
import { saveAccessToken, credentials } from './credentials';
import log from '../util/logging';

const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const scopes = ['user_read', 'channel_read'];

log.info('Api credentials', credentials);

/**
 * Handles the callback from Twitch on 'will-navigate'
 * @param  String   - url
 * @param  Function - callback
 */
function handleAuthCallback(url, callback) {
  // Extract the authentication code
  const raw = /code=([^&]*)/.exec(url) || null;
  const c = (raw && raw.length > 1) ? raw[1] : null;

  // Data to be sent when requestion an auth token
  const postData = querystring.stringify({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    grant_type: 'authorization_code',
    redirect_uri: credentials.redirect_url,
    code: c
  });

  // Structure of the request
  const reqMeta = {
    host: 'api.twitch.tv',
    path: '/kraken/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      accept: '*/*'
    },
    method: 'POST'
  };

  // The request itself
  const req = https.request(reqMeta, (response) => {
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
}

/**
 * Launches a twitch authentication window
 */
export function InitiateAuthFlow() {
  // Only allow if there is not already an auth_code set
  if (credentials.access_token === null) {
    // Construct a new window that sends the user to the twitch oauth page
    let authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      'node-integration': false
    });

    let authURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code';

    // Add scopes (the permissions being requested)
    authURL += ('&scope=' + scopes.join(' '));
    authURL = authURL
      + '&client_id=' + credentials.client_id
      + '&redirect_uri=' + credentials.redirect_url;

    authWindow.loadURL(authURL);
    authWindow.show();

    // When the window is due to navigate
    authWindow.webContents.on('will-navigate', (e, url) => {
      // We want to intercept the callback from twitch
      if (url.slice(0, 16) === 'http://localhost') {
        // Gets authentication token
        handleAuthCallback(url, (data) => {
          // Set the authentication token in the local storage
          saveAccessToken(data.access_token);
        });
        e.preventDefault();
        authWindow.close();
      }
    });

    authWindow.on('close', () => {
      authWindow = null;
    }, false);
  } else {
    log.warn('Auth code already defined as: ' + credentials.access_token);
  }
}

/**
 * Checks to see if an authentication token has been set for the active session
 */
export function IsAuthenticated() {
  return (credentials.access_token !== null);
}

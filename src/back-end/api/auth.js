import electron from 'electron';
import request from 'request';

import { saveAccessToken, credentials } from './credentials';
import options from '../options';
import log from '../util/logging';

const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const scopes = ['user_read'];

/**
 * Handles the callback from Twitch on 'will-navigate'
 * @param  String   - url
 * @param  Function - callback
 */
function handleAuthCallback(url, callback) {
  // Extract the authentication code
  const raw = /code=([^&]*)/.exec(url) || null;
  const c = (raw && raw.length > 1) ? raw[1] : null;

  const postData = { code: c };

  // TODO clean
  const nurl = `http://${options.api.host}:${options.api.port}${options.api.path}oauth2/token`;
  request.post({ url: nurl, form: postData }, (err, httpResponse, body) => {
    if (err) {
      callback(null, err);
    } else {
      callback(JSON.parse(body), null);
    }
  });
}

/**
 * Launches a twitch authentication window
 */
export function initiateAuthFlow(callback) {
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
    authWindow.webContents.on('did-navigate', (e, url) => {
      // We want to intercept the callback from twitch
      if (url.slice(0, 16) === 'http://localhost') {
        // Gets authentication token
        handleAuthCallback(url, (data, err) => {
          if (err) {
            log.error(err);
          } else {
            // Set the authentication token in the local storage
            saveAccessToken(data.access_token);
            authWindow.close();
            if (callback) {
              callback();
            }
          }
        });
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

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

const Configstore = require('configstore');
const conf = new Configstore('fidget');
const auth = require('../../auth.json');

const authOptions = {
  client_id: auth.client_id,
  client_secret: auth.client_secret,
  redirect_url: auth.redirect_url,
  scope: '',
};

console.log(conf.get('auth_code'));

function handleAuthCallback(url) {
  const raw = /code=([^&]*)/.exec(url) || null;
  const code = (raw && raw.length > 1) ? raw[1] : null;
  conf.set('auth_code', code);
}


export function InitiateAuthFlow() {
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
}

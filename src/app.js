const electron = require('electron');
const app = electron.app;  // Module to control application life.
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

const Configstore = require('configstore');
const conf = new Configstore('fidget');
const auth = require('../auth.json');

const authOptions = {
  client_id: auth.client_id,
  client_secret: auth.client_secret,
  redirect_url: auth.redirect_url,
  scope: '',
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Report crashes to our server.
electron.crashReporter.start();

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  console.log(process.version);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/front-end/views/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function handleAuthCallback(url) {
  const raw = /code=([^&]*)/.exec(url) || null;
  const code = (raw && raw.length > 1) ? raw[1] : null;
  conf.set('auth_code', code);
}

ipcMain.on('button-pressed', () => {
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
});

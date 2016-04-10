'use babel';
import electron from 'electron';

import * as auth from './back-end/api/auth';
import menu from './back-end/menu';
import log from './back-end/util/logging';

const app = electron.app;  // Module to control application life.
app.dock.hide();

const ipcMain = electron.ipcMain;

export function start() {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.

  // Report crashes to our server.
  electron.crashReporter.start({
    productName: 'Twitch Viewer',
    companyName: 'thisisjimah',
    submitURL: 'http://dammitjim.co.uk/crash',
    autoSubmit: false
  });

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
    log.info('Creating menubar');
    menu();
  });

  ipcMain.on('button-pressed', auth.InitiateAuthFlow);
}

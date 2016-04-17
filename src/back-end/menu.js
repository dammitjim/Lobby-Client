import electron from 'electron';

import menubar from 'menubar';
import open from 'open';

import * as menuactions from './menu/actions';
import log from './util/logging';

// Process control
const ipcMain = electron.ipcMain;

// Interval to poll the api
const pollInterval = 5000;

// Create the menubar
const bar = menubar({
  index: 'file://' + __dirname + '/../front-end/index.html',
  icon: process.cwd() + '/src/front-end/icons/purple_heart.png',
  width: 320,
  height: 600,
  showDockIcon: false
});

// Message sent from the renderer process to open the twitch stream in native browser
ipcMain.on('open-browser', (event, url) => {
  log.info('Opening %s in browser.', url);
  open(url);
});

ipcMain.on('view-loaded', (event) => {
  bar.window.webContents.send('loaded-followed-streams', JSON.stringify(bar.polledData));
});

// Message sent to retreive games list
ipcMain.on('get-games', (event) => {
  menuactions.getGames();
});

electron.app.on('ready', () => {
  // Stop polling on suspend
  electron.powerMonitor.on('suspend', () => {
    bar.continuePolling = false;
  });

  // Continue polling on resume
  electron.powerMonitor.on('resume', () => {
    bar.continuePolling = true;
  });
});

export default function() {
  bar.continuePolling = true;
  menuactions.pollFollowed(bar);
  menuactions.getGames(bar);
  menuactions.getStreams(bar);

  setInterval(() => {
    menuactions.pollFollowed(bar);
  }, pollInterval);

  bar.on('after-create-window', () => {
    setTimeout(() => {
      log.info('Sending loaded-followed-streams to menubar');
      bar.window.webContents.send('loaded-followed-streams', JSON.stringify(bar.polledData));
    }, pollInterval);

    // bar.window.openDevTools({
    //   detach: true
    // });
  });

  bar.on('after-close', () => {
    log.info('Menubar closed, recreating on next show');
  });
}

import Electron from 'electron';

import menubar from 'menubar';
import open from 'open';

import { authenticate } from './util/middlewares';
import log from './util/logging';

// import { notify } from './notifications';

import * as api from './api';

const ipcMain = Electron.ipcMain;

const bar = menubar({
  index: 'file://' + __dirname + '/../front-end/index.html',
  icon: 'file://' + __dirname + '/../front-end/icon.icns',
  width: 320,
  height: 600,
  showDockIcon: true
});

const pollInterval = 5000;

// Message sent from the renderer process to open the twitch stream in native browser
ipcMain.on('open-browser', (event, url) => {
  log.info('Opening %s in browser.', url);
  open(url);
});

let polledData = '';

// function checkNotifications(original, updated) {
  // notify('This is only a test', 'This is only a message', 'http://healthyceleb.com/wp-content/uploads/2013/08/Dwayne-Johnson.jpg', (notifierObject, options) => {
  // });
// }

/**
 * Validates the target browserwindow's capability to receive messages
 * @param  browserwindow target
 * @return bool
 */
function targetAvailable(target) {
  if (target.window !== undefined) {
    if (target.window.webContents !== undefined) {
      return true;
    }
  }
  return false;
}

/**
 * Get games retreives the top games list
 */
function getGames() {
  api.call('games/top?limit=30', (err, data) => {
    if (err) {
      log.info(err);
      return;
    }
    if (targetAvailable(bar)) {
      bar.window.webContents.send('loaded-games', JSON.stringify(data));
    }
  });
}

/**
 * Get streams for game if provided, global if not
 * @param  string game
 */
function getStreams(game) {
  let reqURL = 'streams';
  if (game) {
    reqURL += `?game=${game}`;
  }
  api.call(reqURL, (err, data) => {
    console.log(data);
    if (err) {
      log.info(err);
      return;
    }
    if (targetAvailable(bar)) {
      if (game) {
        const d = {};
        d[game] = data;
        bar.window.webContents.send('loaded-streams', JSON.stringify(d));
      } else {
        bar.window.webContents.send('loaded-streams', JSON.stringify(data));
      }
    }
  });
}

/**
 * Polls the api and sends the data to the target
 * @param  BrowserWindow target
 */
function pollFollowed() {
  api.call('streams/followed', authenticate, (err, data) => {
    // checkNotifications(polledData, data);
    polledData = data;
    if (targetAvailable(bar)) {
      bar.window.webContents.send('loaded-followed-streams', JSON.stringify(polledData));
    }
  });
}

// Message sent to retreive games list
ipcMain.on('get-games', (event) => {
  console.log(event);
  getGames();
});

export default function() {
  pollFollowed();
  getGames();
  getStreams();

  setInterval(() => {
    pollFollowed();
  }, pollInterval);

  bar.on('after-create-window', () => {
    setTimeout(() => {
      log.info('Sending loaded-followed-streams to menubar');
      bar.window.webContents.send('loaded-followed-streams', JSON.stringify(polledData));
    }, pollInterval);
    bar.window.openDevTools({
      detach: true
    });
  });

  bar.on('after-close', () => {
    log.info('Menubar closed, recreating on next show');
  });
}

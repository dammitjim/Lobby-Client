import Electron from 'electron';

import menubar from 'menubar';
import open from 'open';
import { authenticate } from './middlewares';
import log from './logging';
import { notify } from './notifications';

import * as api from './api';

const ipcMain = Electron.ipcMain;

const bar = menubar({
  index: 'file://' + __dirname + '/../front-end/native-ui/index.html',
  icon: 'file://' + __dirname + '/../front-end/native-ui/icon.icns',
  width: 320,
  height: 600,
  showDockIcon: true
});

const pollInterval = 10000;

// Message sent from the renderer process to open the twitch stream in native browser
ipcMain.on('open-browser', (event, url) => {
  log.info('Opening %s in browser.', url);
  open(url);
});

let polledData = '';

function checkNotifications(original, updated) {
  log.info(updated);
  notify('This is only a test', 'This is only a message', 'http://healthyceleb.com/wp-content/uploads/2013/08/Dwayne-Johnson.jpg', (notifierObject, options) => {
    log.info('Notifier Object', notifierObject);
    log.info('Options', options);
  });
}

/**
 * Polls the api and sends the data to the target
 * @param  BrowserWindow target
 */
function poll(target) {
  api.call('streams/followed', authenticate, (err, data) => {
    checkNotifications(polledData, data);
    polledData = data;
    if (target.window !== undefined) {
      if (target.window.webContents !== undefined) {
        bar.window.webContents.send('loaded-followed-streams', JSON.stringify(polledData));
      }
    }
  });
}

export default function() {
  bar.on('ready', () => {
    poll(bar);
    setInterval(() => {
      poll(bar);
    }, pollInterval);
  });

  bar.on('after-create-window', () => {
    setTimeout(() => {
      log.info('Sending loaded-followed-streams to menubar');
      bar.window.webContents.send('loaded-followed-streams', JSON.stringify(polledData));
    }, 1000);
    bar.window.openDevTools({
      detach: true
    });
  });

  bar.on('after-close', () => {
    log.info('Menubar closed, recreating on next show');
  });
}

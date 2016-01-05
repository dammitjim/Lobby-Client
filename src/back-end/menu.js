import menubar from 'menubar';
import Electron from 'electron';
import open from 'open';

import * as api from './api';

const ipcMain = Electron.ipcMain;

const bar = menubar({
  index: 'file://' + __dirname + '/../front-end/native-ui/index.html',
  icon: 'file://' + __dirname + '/../front-end/native-ui/icon.icns',
  width: 320,
  height: 400,
  showDockIcon: true
});


// Message sent from the renderer process to open the twitch stream in native browser
ipcMain.on('open-browser', (event, url) => {
  open(url);
});

let polledData = '';

/**
 * Polls the api and sends the data to the target
 * @param  BrowserWindow target
 */
function poll(target) {
  api.followedStreams(null, (data) => {
    polledData = JSON.stringify(data);
    if (target.window !== undefined) {
      if (target.window.webContents !== undefined) {
        bar.window.webContents.send('loaded-followed-streams', polledData);
      }
    }
  });
}

export default function() {
  bar.on('ready', () => {
    poll(bar);
    setInterval(() => {
      poll(bar);
    }, 5000);
  });

  bar.on('after-create-window', () => {
    setTimeout(() => {
      bar.window.webContents.send('loaded-followed-streams', polledData);
    }, 500);
    // bar.window.openDevTools({
    //   detach: true
    // });
  });
}

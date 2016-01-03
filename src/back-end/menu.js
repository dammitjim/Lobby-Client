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

export default function() {
  bar.on('ready', () => {});

  bar.on('after-create-window', () => {
    bar.window.openDevTools({
      detach: true
    });
    api.followedStreams(null, (data) => {
      bar.window.webContents.send('loaded-followed-streams', JSON.stringify(data));
    });
  });
}

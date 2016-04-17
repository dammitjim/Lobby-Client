import Electron from 'electron';

const ipcRenderer = Electron.ipcRenderer;

export function refreshChannels() {
  ipcRenderer.send('get-channels');
}

export function refreshGames() {
  ipcRenderer.send('get-games');
}

export function refreshFollowed() {
  ipcRenderer.send('get-followed');
}

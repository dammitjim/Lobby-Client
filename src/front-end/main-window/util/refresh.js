import Electron from 'electron';

const ipcRenderer = Electron.ipcRenderer;

export function refreshChannels() {
  ipcRenderer.send('get-channels');
}

export function refreshFollowed() {
  ipcRenderer.send('get-followed');
}

export function loadConfig() {
  ipcRenderer.send('load-config');
}

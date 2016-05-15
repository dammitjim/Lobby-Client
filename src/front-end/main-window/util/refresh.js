import Electron from 'electron';

import Store from '../state/store';
import * as actions from '../state/actions';

const ipcRenderer = Electron.ipcRenderer;

export function refreshChannels() {
  Store.dispatch(actions.reloadingState({
    type: 'Channels',
    loading: true
  }));
  ipcRenderer.send('get-channels');
}

export function refreshFollowed() {
  Store.dispatch(actions.reloadingState({
    type: 'Followed',
    loading: true
  }));
  ipcRenderer.send('get-followed');
}

export function loadConfig() {
  ipcRenderer.send('load-config');
}

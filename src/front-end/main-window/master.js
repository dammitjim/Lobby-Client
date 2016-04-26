import Electron from 'electron';
import React from 'react';
import { render } from 'react-dom';

import Store from './state/store';
import Application from './components/app';
import Listeners from './state/listeners';

const ipcRenderer = Electron.ipcRenderer;

console.log('Active listeners:', Listeners);

render(
  <Application store={ Store } />,
  document.getElementById('mount')
);

ipcRenderer.send('view-loaded');

import React from 'react';
import { render } from 'react-dom';
import Electron from 'electron';
const ipcRenderer = Electron.ipcRenderer;

import createStore from './create-store';
import Application from './app';
import * as actionCreators from './actions';

const store = createStore();

const thumbnailOptions = {
  width: 320,
  height: 180
};

function getStreamPreview(template) {
  let newTemplate = template.replace('{width}', thumbnailOptions.width);
  newTemplate = newTemplate.replace('{height}', thumbnailOptions.height);
  return newTemplate;
}

ipcRenderer.on('loaded-followed-streams', (event, data) => {
  const d = JSON.parse(data);
  const streams = [];

  // Extract what we need
  for (let i = 0; i < d.streams.length; i++) {
    streams.push({
      key: d.streams[i]._id,
      channelName: d.streams[i].channel.display_name,
      viewers: d.streams[i].viewers,
      url: d.streams[i].channel.url,
      preview: getStreamPreview(d.streams[i].preview.template),
      status: d.streams[i].channel.status,
      game: d.streams[i].game,
      logo: d.streams[i].channel.logo
    });
  }
  console.log('Dispatching to store');
  store.dispatch(actionCreators.streamAction(streams));
  console.log(store.getState());
});

render(
  <Application store={ store } />,
  document.getElementById('mount')
);

// require('./flow.js');

// export function start() {
//   React.render(
//       <Table />,
//       document.getElementById('mount')
//   );
// }

import Electron from 'electron';

import Store from './store';
import * as actionCreators from './actions';

const ipcRenderer = Electron.ipcRenderer;

const thumbnailOptions = {
  width: 320,
  height: 180
};

function getStreamPreview(template) {
  let newTemplate = template.replace('{width}', thumbnailOptions.width);
  newTemplate = newTemplate.replace('{height}', thumbnailOptions.height);
  return newTemplate;
}

// Fired when the main thread receives a response from the api
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
  // Send action to store
  Store.dispatch(actionCreators.streamAction(streams));
});

export default ['loaded-followed-streams'];

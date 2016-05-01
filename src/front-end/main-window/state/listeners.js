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

function extractStreamData(json) {
  const d = JSON.parse(json);

  if (!d) {
    // lol if no d
    return [];
  }

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

  return streams;
}

// Fired when the main thread receives a response from the api
ipcRenderer.on('loaded-followed-streams', (event, data) => {
  const streams = extractStreamData(data);
  Store.dispatch(actionCreators.followedStreamsLoadedAction(streams));
});

ipcRenderer.on('loaded-channel-streams', (event, data) => {
  const streams = extractStreamData(data);
  Store.dispatch(actionCreators.channelStreamsLoadedAction(streams));
});

ipcRenderer.on('loaded-games', (event, data) => {
  const games = JSON.parse(data);
  Store.dispatch(actionCreators.gamesLoadedAction(games));
});

export default ['loaded-followed-streams', 'loaded-channel-streams', 'loaded-games'];

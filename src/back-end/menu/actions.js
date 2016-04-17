import { authenticate } from '../util/middlewares';
import { notify } from '../util/notifications';
import log from '../util/logging';

import * as api from '../api/api';
import * as menulib from './lib';

import * as _ from 'lodash';

/**
 * Validates the target browserwindow's capability to receive messages
 * @param  browserwindow target
 * @return bool
 */
export function targetAvailable(target) {
  if (target.window !== undefined) {
    if (target.window.webContents !== undefined) {
      return true;
    }
  }
  return false;
}

/**
 * Polls the api and sends the data to the target
 * @param  BrowserWindow target
 */
export function pollFollowed(target) {
  if (target.continuePolling) {
    api.call('streams/followed', authenticate, (err, data) => {
      // If we have previous data to compare, check to see if anybody new is streaming
      if (target.polledData) {
        const newStreams = menulib.diffStreams(target.polledData, data.streams);
        if (_.size(newStreams) > 0) {
          for (let i = 0; i < _.size(newStreams); i++) {
            notify(newStreams[i].name, newStreams[i].status, newStreams[i].thumbnail, newStreams[i].url);
          }
        }
      }

      target.polledData = data;
      if (targetAvailable(target)) {
        target.window.webContents.send('loaded-followed-streams', JSON.stringify(target.polledData));
      }
    });
  }
}

/**
 * Get games retreives the top games list
 */
export function getGames(target) {
  api.call('games/top?limit=30', (err, data) => {
    if (err) {
      log.info(err);
      return;
    }

    if (targetAvailable(target)) {
      target.window.webContents.send('loaded-games', JSON.stringify(data));
    }
  });
}

/**
 * Get streams for game if provided, global if not
 * @param  string game
 */
export function getStreams(target, game) {
  let reqURL = 'streams';
  if (game) {
    reqURL += `?game=${game}`;
  }

  api.call(reqURL, (err, data) => {
    if (err) {
      log.info(err);
      return;
    }
    if (targetAvailable(target)) {
      // if (game) {
      //   const d = {};
      //   d[game] = data;
      //   target.window.webContents.send('loaded-channel-streams', JSON.stringify(d));
      // } else {
      target.window.webContents.send('loaded-channel-streams', JSON.stringify(data));
      // }
    }
  });
}

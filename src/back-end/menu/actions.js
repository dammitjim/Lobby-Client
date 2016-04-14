import { authenticate } from '../util/middlewares';
import log from '../util/logging';

import * as api from '../api/api';
import * as menulib from './lib';

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
        if (menulib.diff(target.polledData, data)) {
          // TODO
          // here we need to notify the user of differences if notifications are enabled
          //
          // Set the icon to indicate notifications bro
          // bar.tray.setIcon(somicon)
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
      if (game) {
        const d = {};
        d[game] = data;
        target.window.webContents.send('loaded-streams', JSON.stringify(d));
      } else {
        target.window.webContents.send('loaded-streams', JSON.stringify(data));
      }
    }
  });
}

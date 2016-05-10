import notifier from 'node-notifier';
import open from 'open';

import * as _ from 'lodash';

import { reloadConfig } from '../config';
import log from './logging';

export function notify(title, message, icon, url) {
  const conf = reloadConfig();
  if (conf.enable_notifications) {
    log.info('Sending notification', title, message, icon);
    notifier.notify({
      title,
      message,
      icon,
      sound: false,
      wait: false
    }, (err, response) => {
      if (_.lowerCase(response) === 'activate') {
        open(url);
      }
    });
  }
}

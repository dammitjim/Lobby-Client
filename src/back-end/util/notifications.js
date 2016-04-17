import notifier from 'node-notifier';
import open from 'open';
import * as _ from 'lodash';

import log from './logging';

export function notify(title, message, icon, url) {
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

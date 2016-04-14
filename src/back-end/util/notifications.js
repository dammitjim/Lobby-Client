import notifier from 'node-notifier';
import open from 'open';
import * as _ from 'lodash';

import log from './logging';

// TODO improve the readability of this function
export function notify(t, m, i, url) {
  log.info('Sending notification', t, m, i);
  notifier.notify({
    title: t,
    message: m,
    icon: i,
    sound: false,
    wait: false
  }, (err, response) => {
    if (_.lowerCase(response) === 'activate') {
      open(url);
    }
  });
}

import notifier from 'node-notifier';
import log from './logging';

export function notify(t, m, i, callback) {
  log.info('Sending notification', t, m, i);
  notifier.notify({
    title: t,
    message: m,
    icon: i,
    sound: 'Ping',
    wait: true
  });
  notifier.on('click', callback);
}

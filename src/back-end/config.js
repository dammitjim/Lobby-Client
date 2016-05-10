import Configstore from 'configstore';
import log from './util/logging';

const conf = new Configstore('lobby');

const config = {
  authenticated: (conf.get('access_token') !== undefined)
};

if (conf.get('enable_polling') === undefined) {
  conf.set('enable_polling', true);
}

if (conf.get('enable_notifications') === undefined) {
  conf.set('enable_notifications', true);
}

if (conf.get('row_style') === undefined) {
  conf.set('row_style', 'big');
}

if (conf.get('poll_interval') === undefined) {
  conf.set('poll_interval', 10);
}

export function reloadConfig() {
  config.authenticated = (conf.get('access_token') !== undefined);
  config.enable_polling = conf.get('enable_polling');
  config.enable_notifications = conf.get('enable_notifications');
  config.row_style = conf.get('row_style');
  config.poll_interval = conf.get('poll_interval');
  return config;
}

/**
 * Saves the configuration based on properties attached to data object
 * @param  object: data
 * @return object: full configuration
 */
export function saveConfig(data) {
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    conf.set(keys[i], data[keys[i]]);
  }
  log.info('Saved config: ', data);
  return reloadConfig();
}

export default config;

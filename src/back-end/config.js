import Configstore from 'configstore';

const conf = new Configstore('lobby');

const config = {
  authenticated: (conf.get('access_token') !== undefined)
};

export function reloadConfig() {
  config.authenticated = (conf.get('access_token') !== undefined);
}

export default config;

import Configstore from 'configstore';

const auth = require('../../auth.json');
const conf = new Configstore('fidget');

const credentials = {
  client_id: auth.client_id,
  client_secret: auth.client_secret,
  redirect_url: auth.redirect_url,
  access_token: null
};

if (conf.get('access_token') !== undefined) {
  credentials.access_token = conf.get('access_token');
}

/**
 * Sets the access token in credentials
 * @param String token
 */
export function setAccessToken(token) {
  credentials.access_token = token;
}


/**
 * Saves the access token in configstore and sets it
 * @param  String token
 */
export function saveAccessToken(token) {
  conf.set('access_token', token);
  setAccessToken(token);
}


export {
  credentials
};

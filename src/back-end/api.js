import apiAuth from './api_auth';
import * as userAuth from './auth';
import https from 'https';

/**
 * Apply filters to the given url path
 * @param  Object | null  filters  - Hash table filter_key => filter_value (string)
 * @param  String         path     - URL to add filters to
 * @return String                  - URL with new filters
 */
function applyFilters(filters, path) {
  if (filters === null) {
    return path;
  }

  let pathWithFilters = path + '?';
  let initial = true;

  // TODO investigate if this can actually be const?
  for (const key in filters) {
    if ({}.hasOwnProperty.call(filters, key)) {
      if (!initial) {
        pathWithFilters += '&';
      }
      pathWithFilters += key;
      pathWithFilters += ('=' + encodeURIComponent(filters[key]));
      initial = false;
    }
  }
  return pathWithFilters;
}


/**
 * Generates a request for the specified endpoint with filters
 * @param  String         endpoint - e.g /streams
 * @param  Object | null  filters  - Hash table filter_key => filter_value (string)
 * @return Object
 */
function generateRequest(endpoint, filters) {
  const req = {
    host: 'api.twitch.tv',
    path: '/kraken/' + endpoint,
    headers: {
      'client_id': apiAuth.client_id,
      'accept': '*/*',
    },
    method: 'GET',
  };

  // Apply filters if applicable
  req.path = applyFilters(filters, req.path);
  return req;
}


function generateAuthenticatedRequest(endpoint) {
  const code = userAuth.code();
  const req = {
    host: 'api.twitch.tv',
    path: '/kraken/' + endpoint,
    headers: {
      'client_id': apiAuth.client_id,
      'oauth_token': code,
      'accept': '*/*',
    },
    method: 'GET',
  };
  return req;
}

/**
 * Fires the request provided
 * @param  Object   req      - generated from generateRequest
 * @param  Function callback
 */
function fire(req, callback) {
  https.get(req, (response) => {
    let data = '';
    // Load data into chunks and append to the data
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      // Send the parsed object to the callback
      callback(JSON.parse(data));
    });
  });
}


/**
 * Retreives streams from the API based on filters
 * @param  Object | null  filters  - Hash table filter_key => filter_value (string)
 * @param  Function       callback
 */
export function streams(filters, callback) {
  const req = generateRequest('streams', filters);
  console.log(req);
  fire(req, callback);
}


/**
 * Retreives games from the API based on filters
 * @param  Object | null  filters  - Hash table filter_key => filter_value (string)
 * @param  Function       callback
 */
export function games(filters, callback) {
  const req = generateRequest('games/top', filters);
  console.log(req);
  fire(req, callback);
}

export function user(callback) {
  const req = generateAuthenticatedRequest('user');
  console.log(req);
  fire(req, callback);
}

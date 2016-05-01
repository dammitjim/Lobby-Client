import { credentials } from './credentials';
import options from '../options';
import log from '../util/logging';
import http from 'http';

/**
 * Apply filters to the given url path
 * @param  Object | null  filters  - Hash table filter_key => filter_value (string)
 * @param  String         path     - URL to add filters to
 * @return String                  - URL with new filters
 */
function applyFilters(filters, path) {
  if (filters === null || filters === undefined) {
    return path;
  }

  let pathWithFilters = path + '?';
  let initial = true;

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
function generateRequest(endpoint, filters, requiresAuth = false) {
  const req = {
    host: options.api.host,
    port: options.api.port,
    path: options.api.path + endpoint,
    headers: {
      client_id: credentials.client_id,
      accept: '*/*'
    },
    method: 'GET'
  };

  if (requiresAuth === true) {
    req.headers.Authorization = 'Oauth ' + credentials.access_token;
  }

  // Apply filters if applicable
  req.path = applyFilters(filters, req.path);
  return req;
}

/**
 * Fires the request provided
 * @param  Object   req      - generated from generateRequest
 * @param  Function callback
 */
function fire(req, callback) {
  if (req.error !== undefined) {
    callback(Error(req.error), undefined);
  } else {
    log.info('Firing request', req);
    http.get(req, (response) => {
      let data = '';

      // Load data into chunks and append to the data
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // Send the parsed object to the callback
        callback(undefined, JSON.parse(data));
      });
    });
  }
}

export function call() {
  const callback = arguments[arguments.length - 1];

  // Not following format required
  if (arguments.length < 2) {
    fire({ error: 'First argument should be endpoint, last argument should be callback' }, callback);
  }

  let req = generateRequest(arguments[0]);

  // Middlewares have been supplied
  if (arguments.length > 2) {
    const middlewares = [].slice.call(arguments, 1, arguments.length - 1);
    for (let i = 0; i < middlewares.length; i++) {
      req = middlewares[i](req);
    }
  }

  fire(req, callback);
}

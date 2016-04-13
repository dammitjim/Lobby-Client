import { credentials } from '../api/credentials';
import log from './logging';

/**
 * Filter middleware
 * @param  Object req       - Request.
 * @param  Object filters   - Key value where the key is the filter name.
 * @return Object           - Request with filters applied to GET parameters.
 */
export function filter(req, filters) {
  if (filters === null || filters === undefined) {
    return req;
  }

  let pathWithFilters = req.path + '?';
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

  req.path = pathWithFilters;
  return req;
}

/**
 * Authentication middleware, checks to see if active user has oauth authenticated.
 * If they are authenticated, appends the Authorization headers.
 * If not it adds an error.
 * @param  Object req - Request.
 * @return Object     - Request.
 */
export function authenticate(req) {
  if (credentials.access_token === undefined) {
    req.error = 'Access token undefined';
  }

  req.headers.Authorization = 'OAuth ' + credentials.access_token;
  return req;
}

/**
 * Logging middleware
 * @param  Object req - Request.
 * @return Object     - Request.
 */
export function logger(req) {
  log.info(req);
  return req;
}

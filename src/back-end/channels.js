import authOptions from './api_auth';
import https from 'https';

export function getStreams(callback) {
  console.log('Starting getting streams');
  const req = {
    host: 'api.twitch.tv',
    path: '/kraken/streams',
    headers: { 'client_id': authOptions.client_id, 'accept': '*/*' },
    method: 'GET',
  };

  https.get(req, (response) => {
    let resData = '';
    response.on('data', (chunk) => {
      resData += chunk;
    });
    response.on('end', () => {
      callback(JSON.parse(resData));
    });
  });
}

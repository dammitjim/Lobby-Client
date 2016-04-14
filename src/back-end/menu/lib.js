import * as _ from 'lodash';

/**
 * Returns true if a notable change has occured in the stream listings
 * Use diffStreams if you want the new stream names to be returned
 * @param  [] arrA - Base array
 * @param  [] arrB - New array
 * @return true if diff
 */
export function diff(arrA, arrB) {
  const sizeA = _.size(arrA);
  const sizeB = _.size(arrB);

  // First check if the length is different
  if (sizeA !== sizeB) {
    return true;
  }

  // Check to see if the streamers are different
  const usernames = _.map(arrA.streams, (x) => {
    return x.channel.display_name;
  });

  // Iterate and check to see if there are any new names
  for (let i = 0; i < sizeB; i++) {
    if (usernames.indexOf(arrB.streams[i].channel.display_name) === -1) {
      return true;
    }
  }

  return false;
}

export function diffStreams(arrA, arrB) {
  // TODO this function is currently running if i unfollow a stream
  const sizeB = _.size(arrB);

  // Check to see if the streamers are different
  const usernames = _.map(arrA.streams, (x) => {
    return x.channel.display_name;
  });

  const newStreams = [];
  // Iterate and check to see if there are any new names
  for (let i = 0; i < sizeB; i++) {
    if (usernames.indexOf(arrB[i].channel.display_name) === -1) {
      newStreams.push({
        name: arrB[i].channel.display_name,
        status: arrB[i].channel.status,
        thumbnail: arrB[i].preview.medium,
        url: arrB[i].channel.url
      });
    }
  }

  return newStreams;
}

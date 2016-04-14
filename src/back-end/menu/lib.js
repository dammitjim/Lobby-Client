import * as _ from 'lodash';

/**
 * Returns true if a notable change has occured in the stream listings
 * TODO will need to change this to return an object with the differences
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

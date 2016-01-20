import React from 'react';

const displayName = 'StreamThumbnail';
const propTypes = {
  key: React.PropTypes.string,
  channelName: React.PropTypes.string.isRequired,
  viewers: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  preview: React.PropTypes.string,
  status: React.PropTypes.string.isRequired,
  game: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string
};

class StreamThumb extends React.Component {
  render() {
    return (
      <p>The StreamThumb</p>
    );
  }
}

StreamThumb.displayName = displayName;

StreamThumb.propTypes = propTypes;

export default StreamThumb;

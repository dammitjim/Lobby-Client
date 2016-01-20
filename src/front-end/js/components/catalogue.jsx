import React from 'react';
import StreamThumb from './stream-thumb';

const displayName = 'Catalogue';

class Catalogue extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="catalogue">
        <h2>The Catalogue</h2>
        {
          this.props.streams._streams.map((stream) => {
            return (
              <StreamThumb
                key={ stream.key }
                channelName={stream.channelName}
                viewers={stream.viewers}
                url={stream.url}
                preview={stream.preview}
                status={stream.status}
                game={stream.game}
                logo={stream.logo}
              />
          );
          })
        }
      </div>
    );
  }
}

Catalogue.displayName = displayName;

// Catalogue.propTypes = propTypes;

export default Catalogue;

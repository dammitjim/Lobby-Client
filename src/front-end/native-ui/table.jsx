import React from 'react';
import Electron from 'electron';
import Row from './row';

const ipcRenderer = Electron.ipcRenderer;

class Table extends React.Component {

  /**
   * constructor, also listens for message from main thread that streams are loaded
   * @param  Object props
   */
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };

    ipcRenderer.on('loaded-followed-streams', (event, data) => {
      const d = JSON.parse(data);
      const s = [];
      // Extract what we need
      for (let i = 0; i < d.streams.length; i++) {
        s.push({
          key: d.streams[i]._id,
          channelName: d.streams[i].channel.display_name,
          viewers: d.streams[i].viewers,
          url: d.streams[i].channel.url
        });
      }
      this.setState({ streams: s });
    });
  }

  /**
   * Sets the current streams
   * TODO is there a use case for this?
   * @param  Object updatedStreams
   */
  loadStreams(updatedStreams) {
    this.setState({ streams: updatedStreams });
  }

  /**
   * render
   */
  render() {
    return (
      <div className="table">
        {
          this.state.streams.map((item) => {
            return (
              <Row
                key={item.key}
                channelName={item.channelName}
                viewers={item.viewers}
                url={item.url}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Table;

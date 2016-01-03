import React from 'react';
import Electron from 'electron';
import Row from './row';

const ipcRenderer = Electron.ipcRenderer;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };

    ipcRenderer.on('loaded-followed-streams', (event, data) => {
      const d = JSON.parse(data);
      const s = [];
      for (let i = 0; i < d.streams.length; i++) {
        s.push({
          channelName: d.streams[i].channel.display_name,
          viewers: d.streams[i].viewers,
          url: d.streams[i].channel.url
        });
      }
      this.setState({ streams: s });
    });
  }
  loadStreams(updatedStreams) {
    this.setState({ streams: updatedStreams });
  }
  render() {
    return (
      <div className="table">
        {
          this.state.streams.map((item) => {
            return (
              <Row
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

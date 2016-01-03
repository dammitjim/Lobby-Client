import Electron from 'electron';
import React from 'react';

const ipcRenderer = Electron.ipcRenderer;

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: props.channelName,
      viewers: props.viewers,
      url: props.url
    };
  }
  loadBrowser() {
    ipcRenderer.send('open-browser', this.state.url);
  }
  render() {
    return (
      <div className="row">
        <h4 onClick={ this.loadBrowser.bind(this) }>
          { this.state.channelName }
        </h4>
        <h5>
          Viewers: { this.state.viewers }
        </h5>
      </div>
    );
  }
}

Row.propTypes = {
  channelName: React.PropTypes.string.isRequired,
  viewers: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired
};

export default Row;

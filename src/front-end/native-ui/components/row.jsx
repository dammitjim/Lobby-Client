import Electron from 'electron';
import React from 'react';

const ipcRenderer = Electron.ipcRenderer;

const displayName = 'Row';
const propTypes = {
  key: React.PropTypes.string,
  channelName: React.PropTypes.string.isRequired,
  viewers: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  preview: React.PropTypes.string,
  status: React.PropTypes.string.isRequired,
  game: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired
};

// TODO Channel & Game links
class Row extends React.Component {

  /**
  * Sends a message to the main process with the stream url to open it in the native browser
  */
  loadBrowser() {
    ipcRenderer.send('open-browser', this.props.url);
  }

  /**
  * Renders the row
  */
  render() {
    return (
      <div className="row" key={ this.props.key } >
        <section className="top">
          <div className="profile">
            <img src={ this.props.logo } onClick={ this.loadBrowser.bind(this) } />
          </div>
          <div className="information">
            <span className="channel" onClick={ this.loadBrowser.bind(this) } >
              { this.props.channelName }
            </span>
            <span className="game">
              Playing { this.props.game }
            </span>
          </div>
        </section>
        <section className="detail">
          <div className="overlay" onClick={ this.loadBrowser.bind(this) }>
            <span className="viewers">
              { this.props.viewers } viewers
            </span>
          </div>
          <img src={ this.props.preview } title={ this.props.status }/>
        </section>
      </div>
    );
  }
}

/**
* Validates the properties to ensure nothing is missing
* @type Object
*/
Row.propTypes = propTypes;
Row.displayName = displayName;

export default Row;

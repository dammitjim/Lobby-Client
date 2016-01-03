import Electron from 'electron';
import React from 'react';

const ipcRenderer = Electron.ipcRenderer;

class Row extends React.Component {

  /**
  * constructor
  * @param  Object props - Properties being passed in from Table
  */
  constructor(props) {
    super(props);
    this.state = {
      channelName: props.channelName,
      viewers: props.viewers,
      url: props.url,
      preview: props.preview,
      status: props.status,
      game: props.game,
      logo: props.logo
    };
  }

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
      <div className="row" key={ this.props.key } onClick={ this.loadBrowser.bind(this) }>
        <section className="top">
          <div className="profile">
            <img src={ this.props.logo } />
          </div>
          <div className="information">
            <span className="channel" >
              { this.state.channelName }
            </span>
            <span className="game">
              Playing { this.state.game }
            </span>
          </div>
        </section>
        <section className="detail">
          <div className="overlay">
            <span className="viewers">
              { this.state.viewers } viewers
            </span>
          </div>
          <img src={ this.state.preview } title={ this.state.status }/>
        </section>
      </div>
    );
  }
}

/**
* Validates the properties to ensure nothing is missing
* @type Object
*/
Row.propTypes = {
  key: React.PropTypes.string,
  channelName: React.PropTypes.string.isRequired,
  viewers: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  preview: React.PropTypes.string,
  status: React.PropTypes.string.isRequired,
  game: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired
};

export default Row;

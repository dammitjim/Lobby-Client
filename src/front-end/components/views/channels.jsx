import React from 'react';
import Electron from 'electron';
import Table from './partials/table';
import { refreshChannels } from '../../util/refresh';

import { connect } from 'react-redux';

const ipcRenderer = Electron.ipcRenderer;
const displayName = 'Channels';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Channels extends React.Component {

  openChannels() {
    ipcRenderer.send('open-browser', 'https://www.twitch.tv/directory/all');
  }

  render() {
    return (
      <div>
        <section className="table-header" id="table-header">
          <div id="back-to-top"></div>
          <h2>Channels</h2>
          <a className="refresh" onClick={ refreshChannels }>R</a>
          <div className="clearfix"></div>
        </section>
        <Table data={ this.props.store.streams.channels } />
        <a className="all-channels" onClick={ this.openChannels }>View more.</a>
      </div>
    );
  }
}

Channels.displayName = displayName;

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Channels);

Channels.propTypes = propTypes;

export default con;

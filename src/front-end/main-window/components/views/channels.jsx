import React from 'react';
import Electron from 'electron';
import Table from './partials/table';
import { viewChangedAction } from '../../state/actions';
import { refreshChannels } from '../../util/refresh';

import { connect } from 'react-redux';

const ipcRenderer = Electron.ipcRenderer;
const displayName = 'Channels';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Channels extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: 'Channels',
      action: refreshChannels
    }));
  }

  openChannels() {
    ipcRenderer.send('open-browser', 'https://www.twitch.tv/directory/all');
  }

  render() {
    return (
      <div>
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

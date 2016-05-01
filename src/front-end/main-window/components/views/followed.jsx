import React from 'react';
import Table from './partials/table';
import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';
import { refreshFollowed } from '../../util/refresh';

import Electron from 'electron';
const ipcRenderer = Electron.ipcRenderer;

const displayName = 'Followed Streams';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Followed extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: 'Followed',
      action: refreshFollowed
    }));
  }

  openAuthWindow() {
    ipcRenderer.send('initiate-auth');
  }

  render() {
    if (this.props.store.config.config.authenticated) {
      return (
        <div>
          <Table data={ this.props.store.streams.followed }/>
        </div>
      );
    }

    return (
      <button onClick={this.openAuthWindow}>Authenticate</button>
    );
  }
}

Followed.displayName = displayName;

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Followed);

Followed.propTypes = propTypes;

export default con;

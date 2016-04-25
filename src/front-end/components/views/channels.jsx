import React from 'react';
import Table from './partials/table';
import { refreshChannels } from '../../util/refresh';

import { connect } from 'react-redux';

const displayName = 'Channels';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Channels extends React.Component {
  render() {
    return (
      <div>
        <section className="table-header" id="table-header">
          <div id="back-to-top"></div>
          <h2>Channels</h2>
          <a onClick={ refreshChannels }>Refresh</a>
        </section>
        <Table data={ this.props.store.streams.channels } />
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

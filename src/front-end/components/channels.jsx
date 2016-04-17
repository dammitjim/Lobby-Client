import React from 'react';
import Table from './table';
import { connect } from 'react-redux';

const displayName = 'Channels';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Channels extends React.Component {
  render() {
    return (
      <Table data={ this.props.store.streams.channels }/>
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

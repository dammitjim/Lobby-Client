import React from 'react';
import { connect } from 'react-redux';

const displayName = 'Games';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Games extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

Games.displayName = displayName;

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Games);

Games.propTypes = propTypes;

export default con;

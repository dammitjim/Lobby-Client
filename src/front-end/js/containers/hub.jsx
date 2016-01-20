import React from 'react';
import Catalogue from '../components/catalogue';
import Theatre from '../components/theatre';
import { connect } from 'react-redux';

const displayName = 'Hub';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Hub extends React.Component {
  render() {
    return (
      <div className="hub">
        <Theatre />
        <Catalogue streams={ this.props.store.streams }/>
      </div>
    );
  }
}

Hub.displayName = displayName;

Hub.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Hub);

export default con;

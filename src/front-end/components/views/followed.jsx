import React from 'react';
import Table from './partials/table';
import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';
import { refreshFollowed } from '../../util/refresh';

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

  render() {
    return (
      <div>
        <Table data={ this.props.store.streams.followed }/>
      </div>
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

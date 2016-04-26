import React from 'react';
import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';
import { refreshGames } from '../../util/refresh';

const displayName = 'Games';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Games extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: 'Games',
      action: refreshGames
    }));
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

Games.displayName = displayName;
Games.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Games);

export default con;

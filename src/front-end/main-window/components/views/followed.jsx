import React from 'react';

import Table from './partials/table';
import Login from './partials/login';
import Footer from './partials/footer';

import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';
import { refreshFollowed } from '../../util/refresh';

const displayName = 'Followed Streams';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  header: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Followed extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: 'Followed',
      action: refreshFollowed,
      out: {
        text: 'view on twitch',
        url: 'https://www.twitch.tv/directory/following'
      }
    }));
  }

  render() {
    if (this.props.store.config.config.authenticated) {
      return (
        <div>
          <div className="content" id="content">
            <Table data={ this.props.store.streams.followed }/>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="full-wrapper purple-bg">
        <div className="full-center">
          <Login />
        </div>
      </div>
    );
  }
}

Followed.displayName = displayName;

const mapStateToProps = (state) => {
  return {
    store: state,
    header: state.header
  };
};

const con = connect(mapStateToProps)(Followed);

Followed.propTypes = propTypes;

export default con;

import React from 'react';
import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';

const displayName = 'Configuration';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Configuration extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSTate = this.updateState.bind(this);

    this.state = {
      notifications: true,
      poll: true,
      rowstyle: {
        big: true,
        compact: false
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: 'Configuration',
      action: null
    }));
  }

  updateState(event, data) {
    console.log(event);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div>
        <h1>Configuration</h1>
        <form className="configuration-form" onSubmit={this.handleSubmit}>
          <input type="checkbox" name="notifications" checked={this.state.notifications} onChange={this.updateState} />Allow notifications
          <input type="checkbox" name="poll" checked={this.state.poll} onChange={this.updateState} />Allow lobby to poll in the background
          <input type="radio" name="row-style" checked={this.state.rowstyle.big} onChange={this.updateState} />Big rows
          <input type="radio" name="row-style" checked={this.state.rowstyle.compact} onChange={this.updateState} />Compact rows
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

Configuration.displayName = displayName;
Configuration.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    store: state.config
  };
};

const con = connect(mapStateToProps)(Configuration);
export default con;

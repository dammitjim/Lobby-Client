import React from 'react';
import Electron from 'electron';
import { connect } from 'react-redux';
import { viewChangedAction } from '../../state/actions';

const ipcRenderer = Electron.ipcRenderer;

const displayName = 'Configuration';
const propTypes = {
  store: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

class Configuration extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = this.props.store.config;
    const rowStyle = {};
    if (this.state.row_style === 'big') {
      rowStyle.big = 'on';
      rowStyle.compact = '';
    } else {
      rowStyle.big = '';
      rowStyle.compact = 'on';
    }
    this.state.row_style = rowStyle;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewChangedAction({
      title: '',
      action: null
    }));
  }

  updateState(event) {
    const state = this.state;

    switch (event.target.name) {
      case 'row-style-big':
        state.row_style.big = 'on';
        state.row_style.compact = '';
        break;
      case 'row-style-compact':
        state.row_style.big = '';
        state.row_style.compact = 'on';
        break;
      case 'poll':
        state.enable_polling = event.target.checked;
        break;
      case 'notifications':
        state.enable_notifications = event.target.checked;
        break;
      case 'interval':
        state.poll_interval = event.target.value;
        break;
      default:
        break;
    }

    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const state = Object.assign({}, this.state);
    let style = '';
    if (state.row_style.big === '') {
      style = 'big';
    } else {
      style = 'compact';
    }
    state.row_style = style;
    ipcRenderer.send('save-config', state);
  }

  signOut() {
    ipcRenderer.send('sign-out');
  }

  render() {
    let signOutButton = '';
    if (this.state.authenticated) {
      signOutButton = <button className="sign-out" onClick={this.signOut}>Sign out</button>;
    }

    return (
      <div className="full-wrapper">
        <div className="full-center">
          <form className="configuration-form" onSubmit={this.handleSubmit}>

            <div className="fieldset">
              <label htmlFor="notifications">Allow notifications</label>
              <input type="checkbox" className="checkbox" name="notifications" checked={this.state.enable_notifications} onChange={this.updateState} />
            </div>

            <div className="fieldset">
              <label htmlFor="poll">Enable background polling</label>
              <input type="checkbox" className="checkbox" name="poll" checked={this.state.enable_polling} onChange={this.updateState} />
            </div>

            <hr />

            <div className="fieldset">
              <label htmlFor="notifications" className="newline-label">Poll Interval</label>
              <input type="range" className="input-range" name="interval" min="10" max="60" value={this.state.poll_interval} onChange={this.updateState} />
              <p>{ this.state.poll_interval } seconds</p>
            </div>

            <input className="submit" type="submit" value="Save settings" />
          </form>
          { signOutButton }
        </div>
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

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
      title: 'Configuration',
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

  render() {
    return (
      <div>
        <h1>Configuration</h1>
        <form className="configuration-form" onSubmit={this.handleSubmit}>
          <input type="checkbox" name="notifications" checked={this.state.enable_notifications} onChange={this.updateState} />Allow notifications
          <input type="checkbox" name="poll" checked={this.state.enable_polling} onChange={this.updateState} />Allow lobby to poll in the background
          <input type="radio" name="row-style-big" checked={this.state.row_style.big} onChange={this.updateState} />Big rows
          <input type="radio" name="row-style-compact" checked={this.state.row_style.compact} onChange={this.updateState} />Compact rows
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

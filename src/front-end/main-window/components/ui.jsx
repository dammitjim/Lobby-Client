import React from 'react';
import Electron from 'electron';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Footer from './views/partials/footer';

const ipcRenderer = Electron.ipcRenderer;

const displayName = 'UI';
const propTypes = {
  children: React.PropTypes.object,
  store: React.PropTypes.object
};

class UI extends React.Component {

  openConfig() {
    ipcRenderer.send('open-configuration');
  }

  render() {
    return (
      <div>
        <nav id="nav">
          <ul>
            <li><Link to="/followed" className="menu-link" activeClassName="active">followed</Link></li>
            <li><Link to="/channels" className="menu-link" activeClassName="active">channels</Link></li>
            <li><Link to="/config" className="menu-link" activeClassName="active">config</Link></li>
          </ul>
        </nav>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
UI.displayName = displayName;
UI.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    store: state.header
  };
};

const con = connect(mapStateToProps)(UI);

export default con;

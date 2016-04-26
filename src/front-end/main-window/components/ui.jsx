import React from 'react';
import Electron from 'electron';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
            <li><Link to="/games" className="menu-link" activeClassName="active">G</Link></li>
            <li><Link to="/channels" className="menu-link" activeClassName="active">C</Link></li>
            <li><Link to="/followed" className="menu-link" activeClassName="active">F</Link></li>
          </ul>
        </nav>
        <section className="table-header" id="table-header">
          <h2>{ this.props.store.header.title }</h2>
          <a className="refresh" onClick={ this.props.store.header.action }>R</a>
          <div className="clearfix"></div>
        </section>
        <div className="content" id="content">
          { this.props.children }
        </div>
        <footer>
          <span className="company-slogan">Made by Jim in Bristol</span>
          <a className="settings" onClick={ this.openConfig }>C</a>
        </footer>
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

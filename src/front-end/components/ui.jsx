import React from 'react';
import { Link } from 'react-router';

import { refreshChannels, refreshFollowed, refreshGames } from '../util/refresh';

const displayName = 'UI';
const propTypes = {
  children: React.PropTypes.object
};

class UI extends React.Component {

  getHeaderData() {
    const data = {};
    data.title = '';
    data.action = () => { return false; };

    // TODO you're a bellend
    switch (true) {
      case /games/.test(window.location.hash):
        data.title = 'Games';
        data.action = refreshGames;
        break;
      case /channels/.test(window.location.hash):
        data.title = 'Channels';
        data.action = refreshChannels;
        break;
      case /followed/.test(window.location.hash):
        data.title = 'Following';
        data.action = refreshFollowed;
        break;
      default:
        data.title = 'Following';
        data.action = refreshFollowed;
        break;
    }
    return data;
  }

  render() {
    const header = this.getHeaderData();
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
          <h2>{ header.title }</h2>
          <a className="refresh" onClick={ header.action }>R</a>
          <div className="clearfix"></div>
        </section>
        <div className="content" id="content">
          { this.props.children }
        </div>
        <footer>
          <span className="company-slogan">Made by Jim in Bristol</span>
          <a className="settings">C</a>
        </footer>
      </div>
    );
  }
}

UI.displayName = displayName;
UI.propTypes = propTypes;

export default UI;

import React from 'react';
import { Link } from 'react-router';

import { refreshChannels, refreshFollowed, refreshGames } from '../util/refresh';

const displayName = 'Navigation';
const propTypes = {
  children: React.PropTypes.object
};

class Nav extends React.Component {

  render() {
    let title = '';
    let action = () => { return false; };

    // TODO you're a bellend
    switch (true) {
      case /games/.test(window.location.hash):
        title = 'Games';
        action = refreshGames;
        break;
      case /channels/.test(window.location.hash):
        title = 'Channels';
        action = refreshChannels;
        break;
      case /followed/.test(window.location.hash):
        title = 'Following';
        action = refreshFollowed;
        break;
      default:
        break;
    }

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
          <h2>{ title }</h2>
          <a className="refresh" onClick={ action }>R</a>
          <div className="clearfix"></div>
        </section>
        <div className="content" id="content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Nav.displayName = displayName;
Nav.propTypes = propTypes;

export default Nav;

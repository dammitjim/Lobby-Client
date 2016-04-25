import React from 'react';
import { Link } from 'react-router';

const displayName = 'Navigation';
const propTypes = {
  children: React.PropTypes.object
};

class Nav extends React.Component {
  render() {
    let title = '';
    switch (true) {
      case /games/.test(window.location.hash):
        title = 'Games';
        break;
      case /channels/.test(window.location.hash):
        title = 'Channels';
        break;
      case /followed/.test(window.location.hash):
        title = 'Following';
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
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

Nav.displayName = displayName;
Nav.propTypes = propTypes;

export default Nav;

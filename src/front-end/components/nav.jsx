import React from 'react';
import { Link } from 'react-router';

const displayName = 'Navigation';
const propTypes = {
  children: React.PropTypes.object
};

class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/games" activeClassName="active">Games</Link></li>
          <li><Link to="/channels" activeClassName="active">Channels</Link></li>
          <li><Link to="/followed" activeClassName="active">Followed</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

Nav.displayName = displayName;
Nav.propTypes = propTypes;

export default Nav;

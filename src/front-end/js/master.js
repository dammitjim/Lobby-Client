'use babel';
import React from 'react';
import { Router, Route, Link } from 'react-router';

class Application extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/other">Other</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <h1>Hey nerd</h1>
    );
  }
}

class Other extends React.Component {
  render() {
    return (
      <h1>Hey other nerd</h1>
    );
  }
}

export function start() {
  React.render(
    <Router>
      <Route path="/" component={Application}>
        <Route path="about" component={About} />
        <Route path="other" component={Other} />
      </Route>
    </Router>
    , document.body
  );
}

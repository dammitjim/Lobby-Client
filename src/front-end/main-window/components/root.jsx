import React from 'react';
import { IndexRedirect, Router, Route } from 'react-router';

import Followed from './views/followed';
import Channels from './views/channels';
import Configuration from './views/config';
import UI from './ui';

import { refreshChannels, refreshFollowed, loadConfig } from '../util/refresh';

const displayName = 'Router';

class Routes extends React.Component {

  componentDidMount() {
    loadConfig();
  }

  render() {
    return (
      <Router>
        <Route path="/" component={UI}>
          <IndexRedirect to="/followed" />
          <Route path="/followed" component={Followed} onEnter={refreshFollowed}/>
          <Route path="/channels" component={Channels} onEnter={refreshChannels}/>
          <Route path="/config" component={Configuration} />
        </Route>
      </Router>
    );
  }
}

Routes.displayName = displayName;

export default Routes;

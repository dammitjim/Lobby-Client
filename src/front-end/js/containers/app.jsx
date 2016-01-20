import React from 'react';
import Hub from './hub';
import { Provider } from 'react-redux';

const displayName = 'Application';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Application extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <Hub />
      </Provider>
    );
  }
}

Application.displayName = displayName;

Application.propTypes = propTypes;

export default Application;

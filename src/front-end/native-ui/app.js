import React from 'react';
import Table from './components/table';
import { Provider } from 'react-redux';

const displayName = 'Application';
const propTypes = {
  store: React.PropTypes.object.isRequired
};

class Application extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <Table />
      </Provider>
    );
  }
}

Application.displayName = displayName;

/**
* Validates the properties to ensure nothing is missing
* @type Object
*/
Application.propTypes = propTypes;

export default Application;

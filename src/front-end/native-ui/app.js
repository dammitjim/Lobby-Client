import React from 'react';
import Table from './components/table';
import { Provider } from 'react-redux';

class Application extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <Table />
      </Provider>
    );
  }
}

/**
* Validates the properties to ensure nothing is missing
* @type Object
*/
Application.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Application;

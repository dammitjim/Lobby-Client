import React from 'react';
import Table from './components/table';
import { Provider } from 'react-redux';

export default class Application extends React.Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <Table />
      </Provider>
    );
  }
}

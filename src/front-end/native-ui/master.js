import React from 'react';
import Table from './components/table';

export function start() {
  React.render(
      <Table />,
      document.getElementById('mount')
  );
}

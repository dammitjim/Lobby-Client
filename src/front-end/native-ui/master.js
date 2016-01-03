import React from 'react';
import Table from './table';
export function start() {
  React.render(
      <Table />,
      document.getElementById('mount')
  );
}

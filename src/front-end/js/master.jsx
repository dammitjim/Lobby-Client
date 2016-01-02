'use babel';
import React from 'react';
import TestButton from '../views/test-button';

export function start() {
  React.render(
    <TestButton />,
    document.body
  );
}

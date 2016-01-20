'use babel';
import React from 'react';
import { render } from 'react-dom';

import Store from './state/store';
import Listeners from './state/listeners';

import Application from './containers/app';

console.log('Active listeners:', Listeners);

export function start() {
  render(
    <Application store={ Store } />
    , document.getElementById('mount')
  );
}

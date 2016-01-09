import React from 'react';
import { render } from 'react-dom';

import Store from './store';
import Application from './app';
import Listeners from './listeners';

console.log('Active listeners:', Listeners);

render(
  <Application store={ Store } />,
  document.getElementById('mount')
);

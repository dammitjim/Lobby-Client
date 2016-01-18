import React from 'react';
import { render } from 'react-dom';

import Store from './state/store';
import Application from './components/app';
import Listeners from './state/listeners';

console.log('Active listeners:', Listeners);

render(
  <Application store={ Store } />,
  document.getElementById('mount')
);

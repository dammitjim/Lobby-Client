import {
  Dispatcher
}
from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = (a) => {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: a
  });
};

export {
  AppDispatcher
};

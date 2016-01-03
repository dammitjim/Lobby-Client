'use babel';

// Loads in Babel and runs all following javascript through it for es6 without loads of gulpfile bs
require('babel-core/register');
require('./master.js')
  .start();

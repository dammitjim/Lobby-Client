import React from 'react';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

class TestButton extends React.Component {
  handleClick() {
    ipcRenderer.send('button-pressed', true);
  }
  render() {
    return <a href="#" onClick={ this.handleClick.bind(this) } className="test-button">Press Me</a>;
  }
}

export default TestButton;

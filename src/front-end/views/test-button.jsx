import React from 'react';
import Electron from 'electron';

const ipcRenderer = Electron.ipcRenderer;

class TestButton extends React.Component {
  handleClick() {
    ipcRenderer.send('button-pressed', true);
  }
  render() {
    return <a href="#" onClick={ this.handleClick.bind(this) } className="test-button">Press Me</a>;
  }
}

export default TestButton;

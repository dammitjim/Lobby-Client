import React from 'react';
import Electron from 'electron';

const ipcRenderer = Electron.ipcRenderer;

const displayName = 'Login';
const propTypes = {};

class Login extends React.Component {
  openAuthWindow() {
    ipcRenderer.send('initiate-auth');
  }

  render() {
    return (
      <div className="login">
        <img src="images/twitch.png" className="twitch" />
        <p>Log in to Twitch to see your followed streams and receive notifications when they go live.</p>
        <button onClick={this.openAuthWindow}>Authenticate</button>
      </div>
    );
  }
}

Login.displayName = displayName;
Login.propTypes = propTypes;

export default Login;

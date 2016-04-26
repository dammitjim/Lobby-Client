import Electron from 'electron';

const BrowserWindow = Electron.BrowserWindow;
let configWindow = null;

export function initialise() {
  configWindow = new BrowserWindow({ width: 600, height: 450, show: false });
  configWindow.loadURL('file://' + __dirname + '/../front-end/config-window/index.html');
  configWindow.on('close', () => {
    initialise();
  });
}

export function show() {
  configWindow.show();
}

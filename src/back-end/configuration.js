import Electron from 'electron';

const BrowserWindow = Electron.BrowserWindow;
let configWindow = null;

export function show() {
  configWindow = new BrowserWindow({ width: 600, height: 450, show: false, title: 'Configure' });
  configWindow.loadURL('file://' + __dirname + '/../front-end/config-window/index.html');
  configWindow.show();
}

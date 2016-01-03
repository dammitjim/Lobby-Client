import menubar from 'menubar';
const bar = menubar({
  index: 'file://' + __dirname + '/../front-end/native-ui/index.html',
  icon: 'file://' + __dirname + '/../front-end/native-ui/icon.icns',
  width: 200,
  height: 400,
  showDockIcon: true,
});

export default function () {
  bar.on('ready', () => {
    console.log('Ready');
  });
}

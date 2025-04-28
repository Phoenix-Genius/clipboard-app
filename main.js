const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;
let win = null;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,           // start hidden
    frame: false,          // no window frame
    resizable: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  tray = new Tray(path.join(__dirname, 'icon.png'));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show/Hide', click: toggleWindow },
    { label: 'Quit', click: () => app.quit() }
  ]);

  tray.setToolTip('Clipboard Tray App');
  tray.setContextMenu(contextMenu);

  tray.on('click', toggleWindow);
});

function toggleWindow() {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
    win.focus();
  }
}

app.on('window-all-closed', (e) => {
  e.preventDefault(); // prevent app from closing
});


const electron = require('electron');
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let side_player_window;

export function initSidePlayer() {
  // bind side-player opening event
  ipc.on('side-player/open', () => {
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    let width = 800;
    let height = width*9/16;

    let url = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/side-player.html`
      : `file://${__dirname}/side-player.html`
    side_player_window = new BrowserWindow({
      width: width,
      height: height,
      x: size.width-width,
      //y: size.height-height,
      y: 0,
      alwaysOnTop: true,
      frame:false,
      focusable: false

    });
    side_player_window.loadURL(url);
    side_player_window.on('closed', () => {
      side_player_window = null;
    })
  });
  ipc.on('side-player/close', () => {
    if ( side_player_window ) {
      side_player_window.close();
      side_player_window = null;  
    }
  });
  ipc.on('side-player/toggle-play', () => {
    if ( side_player_window ) {
      side_player_window.webContents.send('side-player/toggle-play');
    }
  });
}

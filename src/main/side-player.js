/*
  side-player.js controls from server-side SidePlayer vue component.
  It exports functions and respond to following IPC messages:

  | exported function |         IPC message                     | feature            |
  |-------------------|-----------------------------------------|--------------------|
  | openPlayer()      | 'side-player/open'                      | open player        |
  | closePlayer()     | 'side-player/close'                     | close player       |
  | togglePlay()      | 'side-player/toggle-play'               | inverse play/pause |
  | changeVideo()     | 'side-player/change-video','[VIDEO-ID]' | changes video      |
*/

const electron = require('electron');
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let side_player_window = null;

export function initSidePlayer() {
  // bind side-player opening event
  ipc.on('side-player/open', () => {
    openPlayer();
  });
  ipc.on('side-player/close', () => {
    closePlayer();
  });
  ipc.on('side-player/toggle-play', () => {
    togglePlay();
  });
  ipc.on('side-player/change-video', (data,arg) => {
    changeVideo(arg);
  })
}

export function openPlayer() {
  if ( !side_player_window ) {
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    let w = 500;
    let h = Math.round(w*9/16);
    console.log(h);

    let url = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/side-player.html`
      : `file://${__dirname}/side-player.html`
    side_player_window = new BrowserWindow({
      width: w,
      height: h,
      x: size.width-w,
      //y: size.height-h,
      y: 0,
      alwaysOnTop: true,
      frame:false,
      focusable: false
    });
    side_player_window.loadURL(url);
    side_player_window.on('closed', () => {
      side_player_window = null;
    })
  }
}

export function closePlayer() {
  if ( side_player_window ) {
    side_player_window.close();
    side_player_window = null;
  }
}

export function togglePlay() {
  if ( side_player_window ) {
    side_player_window.webContents.send('side-player/toggle-play');
  }
}

export function changeVideo(vid_id) {
  if ( side_player_window ) {
    side_player_window.webContents.send('side-player/change-video',vid_id);
  }
}

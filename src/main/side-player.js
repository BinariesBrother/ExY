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
import windowManager from 'electron-window-manager'


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
  if ( !windowManager.get("side-player") ) {
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    let w = 500;
    let h = Math.round(w*9/16);

    let options = {
      width: w,
      height: h,
      x: size.width-w,
      //y: size.height-h,
      y: 0,
      alwaysOnTop: true,
      frame:false,
      focusable: false
    };

    let url = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/side-player.html`
      : `file://${__dirname}/side-player.html`
    ;

    let side_player_window = windowManager.createNew('side-player', 'ExY (side player)', url, false, options, false);
    side_player_window.open()

  }
}

export function closePlayer() {
  if ( windowManager.get("side-player") ) {
    windowManager.close('side-player');
  }
}

export function togglePlay() {
  let w = windowManager.get('side-player');
  if ( w ) {
    w.object.webContents.send('side-player/toggle-play');
  }
}

export function changeVideo(vid_id) {
  let w = windowManager.get('side-player');
  if ( w ) {
    w.object.webContents.send('side-player/change-video',vid_id);
  }
}

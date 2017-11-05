import { app, screen } from 'electron'
import windowManager from 'electron-window-manager'
import Config from 'electron-config'

const config = new Config()

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  windowManager.init({
    defaultWindowTitle: 'ExY',
  })

  const primaryDisplay = screen.getPrimaryDisplay()
  const defaultHeight = 600
  const defaultWidth = 800
  const mainWindowDefaultBounds = {
    height: defaultHeight,
    width: defaultWidth,
    x: parseInt(primaryDisplay.workArea.x + ((primaryDisplay.workArea.width / 2) - (defaultWidth / 2))),
    y: parseInt(primaryDisplay.workArea.y + ((primaryDisplay.workArea.height / 2) - (defaultHeight / 2))),
  }

  let options = {
    minHeight: 400,
    minWidth: 600,
    frame: false,
    resizable: true,
  }

  Object.assign(options, mainWindowDefaultBounds)

  let mainWindowState = config.get('mainWindowState')
  if (mainWindowState) {
    Object.assign(options, mainWindowState.bounds)

    const displays = screen.getAllDisplays()
    for (let i in displays) {
      if (displays[i].id === mainWindowState.display) {
        let display = displays[i]
        // If last position is not in the current bounds, reset to default.
        if (!(options.x >= display.workArea.x && options.x < (display.workArea.x + display.workArea.width) &&
            options.y >= display.workArea.y && options.y < (display.workArea.y + display.workArea.height))) {
          Object.assign(options, mainWindowDefaultBounds)
        }
      }
    }

  }

  mainWindow = windowManager.createNew('main', 'ExY', winURL, false, options, false)

  mainWindow.open()

  if (mainWindowState && mainWindowState.maximized) {
    mainWindow.object.maximize()
  }

  mainWindow.object.on('close', () => {
    const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
    config.set('mainWindowState', {
      maximized: mainWindow.object.isMaximized(),
      bounds: mainWindow.object.getBounds(),
      display: currentDisplay.id,
    })
  })

  mainWindow.object.on('closed', () => {
    mainWindow = null
  })

}

// Fix resize glitch on Chrome Linux.
app.disableHardwareAcceleration()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

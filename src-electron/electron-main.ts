import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow: null | BrowserWindow = null;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 576,
    minWidth: 1024,
    minHeight: 576,
    useContentSize: true,
    resizable: true,
    // 窗口无边框
    frame: false,
    titleBarStyle: 'hidden',
    // 开启透明模式拖拽窗口到边缘无法改变大小
    // transparent: true,
    // win7系统电脑gpu问题 在主进程加上app.disableHardwareAcceleration()
    webPreferences: {
      // allowRunningInsecureContent:true,
      webSecurity: false,
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD as string),
    }
  })


  mainWindow.loadURL(process.env.APP_URL as string)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Set Window Resizable
  mainWindow.setResizable(true);
}
//窗口最小化
ipcMain.on('window-minimize', function () {
  mainWindow?.minimize();
});
//窗口最大化
ipcMain.on('window-toggleMaximize', function () {
  if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
//窗口关闭
ipcMain.on('window-closeApp', function () {
  mainWindow?.close();
});
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

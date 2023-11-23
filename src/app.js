const { app, BrowserWindow, ipcMain } = require('electron')
const server = require('./server.js')
const { existsSync } = require('node:original-fs')
const fs  = require('fs')

require('dotenv').config()

const PORT = 3000

const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 900,
    frame: false,
    fullscreenable:false,
    fullscreen: false,
    maximizable: false,
    title: "hackathon test app",
    resizable: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  })

  win.webContents.openDevTools()

  win.setBackgroundColor('rgba(0, 0, 0, 0)')

  win.webContents.setUserAgent("Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19");

  win.loadURL(`http://localhost:${PORT}`)

  ipc.on('closeApp', () => {
    win.close()
  })

  ipc.on('minimizeApp', () => {
    win.minimize()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
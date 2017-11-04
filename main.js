const { app, Menu, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let win

ipcMain.on('data-fetched', (event, args) => {
  console.log('data-fetched', args)
  event.sender.send('beep', 'boop')
})

setTimeout(() => {
  let contents = win.webContents
  contents.send('beep', 'after 1 second')
}, 1000)

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
    ]
  }
]

app.on('ready', () => {
  createWindow()
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
    })
  }
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})


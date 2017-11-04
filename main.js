const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 300,
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

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


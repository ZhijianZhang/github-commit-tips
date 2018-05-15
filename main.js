const electron = require('electron')
// Module to control application life.
const app = electron.app
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow
// net 是 electron node api
const net = electron.net

const path = require('path')
const url = require('url')

// 获取命令中带的参数
const argv = process
  .argv
  .slice(2)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 400, height: 400})

  //判断是否是开发模式
  if (argv && argv[1] == 'dev') {
    mainWindow.loadURL("http://localhost:3000/")
    console.log('xxxxxxxxxxxxx')
  } else {
    // window 加载build好的html.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // Open the DevTools. 
  // mainWindow.webContents.openDevTools() 

  // Emitted when the
  // window is closed.
  mainWindow
    .on('closed', function () {
      // Dereference the window object, usually you would store windows in an array if
      // your app supports multi windows, this is the time when you should delete the
      // corresponding element.
      mainWindow = null
    })
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this event
// occurs.
app.on('ready', createWindow)
// app.on('ready', () => {
//   const request = net.request('https://github.com')
//   request.on('response', (response) => {
//     console.log(`STATUS: ${response.statusCode}`)
//     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//     response.on('data', (chunk) => {
//       console.log(`BODY: ${chunk}`)
//     })
//     response.on('end', () => {
//       console.log('response请求中没有更多数据。')
//     })
//   })
//   request.end()
// })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar to stay active until
  // the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the dock icon is
  // clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 在主进程中.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})
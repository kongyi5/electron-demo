const { app, BrowserWindow } = require("electron");

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 并且为你的应用加载index.html
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

const { app, BrowserWindow, screen } = require('electron/main');

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({ width, height });

  win.loadFile('src/index.html');
  
  win.maximize();
  win.removeMenu();
  // win.setFullScreen(true); /* USE WHENEVER READY */
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
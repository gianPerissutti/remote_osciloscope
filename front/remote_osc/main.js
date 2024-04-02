import { app, BrowserWindow } from 'electron';

function createWindow () {
  let win = new BrowserWindow({
    width: 960,
    height: 540,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,  // Allows usage of Node.js APIs in the renderer process (for communication)
      contextIsolation: false, // Disabling contextIsolation for simplicity (consider enabling for security in production)
    }
  });

  win.loadURL('http://localhost:5173');

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


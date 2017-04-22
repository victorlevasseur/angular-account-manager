/**
 * Include our app
 */
const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');

// browser-window creates a native window
let mainWindow = null;

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const initMenu = () => {
  /*let menu = Menu.buildFromTemplate([
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouveau'
        },
        {
          label: 'Ouvrir'
        },
        {
          label: 'Enregistrer'
        },
        {
          label: 'Enregistrer sous...'
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);*/
  //Menu.setApplicationMenu(null);
}

const createWindow = () => {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });
  initMenu();

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

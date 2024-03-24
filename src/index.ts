import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import readExcel from './main/lib/excel/readExcel';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    resizable: true,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
  });
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  ipcMain.handle("window-close", () => {
    mainWindow.close()
  })

  ipcMain.handle("window-maximize", () => {
    mainWindow.isMaximized()
      ? mainWindow.unmaximize()
      : mainWindow.maximize()
  })

  ipcMain.handle("window-minimize", () => {
    mainWindow.minimize()
  })

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window:resize", true)
  })

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window:resize", false)
  })

  ipcMain.handle("file:open", () => {
    const file = dialog.showOpenDialogSync({
      title: "Seleccionar Excel o SQL",
      filters: [
        { name: "Excel", extensions: ["xlsx", "xlsm", "xlsb"] },
        { name: "Base de datos", extensions: ["db"] }
      ],
      properties: [
        'openFile'
      ]
    })

    console.log("Filed selected", file)

    const filePath = file[0] as string

    readExcel(filePath)
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
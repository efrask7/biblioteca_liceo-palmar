import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import readExcel from './main/lib/excel/readExcel';
import { getBookById, getBooks, importExcel } from './main/lib/prisma/book.controller';
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

    const books = readExcel(filePath)

    importExcel(books)
  })

  ipcMain.handle("books:getBooks", async (_, params: IGetBooks) => {
    console.log("Invoked getBooks with params:", params)

    const books = await getBooks(params)

    mainWindow.webContents.send("books:getBooks", books)
  })

  ipcMain.handle("books:findById", async (_, id: number) => {
    console.log("Invoked findById with id", id)

    const book = await getBookById(id)

    mainWindow.webContents.send("books:findById", book)
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
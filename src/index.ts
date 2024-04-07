import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import readExcel from './main/lib/excel/readExcel';
import { addBook, deleteAllData, deleteBook, getBookById, getBooks, importExcel, updateBook } from './main/lib/sqlite/book.controller';
import { IRentData } from './pages/books/RentBookModal';
import { addNewRentBook, editRentStatus, removeRent } from './main/lib/sqlite/bookrent.controller';
import { updateElectronApp } from "update-electron-app"
import { createDatabase, getTableCount } from './main/lib/sqlite/db.controller';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

updateElectronApp()
createDatabase()

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

  //!test func
  ipcMain.handle("test", () => console.log("TEST", getTableCount("Books")))
  //!
  
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

  ipcMain.handle("file:open", async () => {
    const file = dialog.showOpenDialogSync({
      title: "Seleccionar Excel o DB",
      filters: [
        { name: "Excel", extensions: ["xlsx", "xlsm", "xlsb"] },
        // { name: "Base de datos", extensions: ["db"] }
      ],
      properties: [
        'openFile'
      ]
    })

    console.log("File selected", file)

    if (!file) {
      mainWindow.webContents.send("file:open", {
        success: false,
        error: "Debes importar un archivo"
      })
      return
    }

    const filePath = file[0] as string

    const books = readExcel(filePath)

    const imported = await importExcel(books)
    console.log("Imported excel", imported)

    mainWindow.webContents.send("file:open", imported)
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

  ipcMain.handle("rent:new", async (_, params: IRentData) => {
    console.log("Invoked new rent with params", params)

    const created = await addNewRentBook(params.id, params.name)

    mainWindow.webContents.send("rent:new", created)
  })

  ipcMain.handle("rent:edit", async (_, params: IRentEdit) => {
    console.log("Invoked edit rent with params", params)

    const edit = await editRentStatus(params.id, params.status)

    mainWindow.webContents.send("rent:edit", edit)
  })

  ipcMain.handle("rent:remove", async (_, id: number) => {
    console.log("Invoked remove rent with id", id)

    const removed = await removeRent(id)

    mainWindow.webContents.send("rent:remove", removed)
  })

  ipcMain.handle("books:update", async (_, params: IBookEdit) => {
    console.log("Invoked update book with params", params)

    const edit = await updateBook(params.id, params.data) 

    mainWindow.webContents.send("books:update", edit)
  })

  ipcMain.handle("books:delete", async (_, id: number) => {
    console.log("Invoked delete book with id", id)

    const deleted = await deleteBook(id)

    mainWindow.webContents.send("books:delete", deleted)
  })

  ipcMain.handle("books:add", async (_, data: IBook) => {
    console.log("Invoked new book with params", data)

    const added = await addBook(data)

    mainWindow.webContents.send("books:add", added)
  })

  ipcMain.handle("file:delete", async () => {
    console.log("Invoked delete all data")

    const deleted = await deleteAllData()

    mainWindow.webContents.send("file:delete", deleted)
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
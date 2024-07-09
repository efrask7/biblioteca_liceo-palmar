import { contextBridge, ipcRenderer } from "electron";
import { Dispatch, SetStateAction } from "react";
import { IBookByIdResult, IBooksRentedResult, IBooksResult } from "./interface";
import { IRentData } from "./pages/books/RentBookModal";

contextBridge.exposeInMainWorld("windowAct", {
  close: () => ipcRenderer.invoke("window-close"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  minimize: () => ipcRenderer.invoke("window-minimize"),
  handleChange: (setState: Dispatch<SetStateAction<boolean>>) => ipcRenderer.on("window:resize", (_, data) => setState(data)),
  closeHandleChange: () => ipcRenderer.off("window:resize", () => {})
})

contextBridge.exposeInMainWorld("files", {
  open: () => ipcRenderer.invoke("file:open"),
  handleOpen: (callback: (result: APIResponse) => void) => ipcRenderer.on("file:open", (_, data) => callback(data)),
  closeHandleOpen: () => ipcRenderer.off("file:open", () => {}),
  delete: () => ipcRenderer.invoke("file:delete"),
  handleDelete: (callback: (result: APIResponse) => void) => ipcRenderer.on("file:delete", (_, data) => callback(data)),
  closeHandleDelete: () => ipcRenderer.off("file:delete", () => {})
})

contextBridge.exposeInMainWorld("books", {
  getBooks: (params: IGetBooks) => ipcRenderer.invoke("books:getBooks", params),
  handleGetBooks: (callback: (booksResult: IBooksResult) => void) => ipcRenderer.on("books:getBooks", (_, data: IBooksResult) => callback(data)),
  closeHandleGetBooks: () => ipcRenderer.off("books:getBooks", () => {}),
  getById: (id: number) => ipcRenderer.invoke("books:findById", id),
  handleGetBookById: (callback: (booksResult: IBookByIdResult) => void) => ipcRenderer.on("books:findById", (_, data: IBookByIdResult) => callback(data)),
  closeHandleGetBookById: () => ipcRenderer.off("books:findById", () => {}),
  updateBook: (params: IBookEdit) => ipcRenderer.invoke("books:update", params),
  handleUpdateBook: (callback: (result: IBookEditRes) => void) => ipcRenderer.on("books:update", (_, data: IBookEditRes) => callback(data)),
  closeHandleUpdateBook: () => ipcRenderer.off("books:update", () => {}),
  deleteBook: (id: number) => ipcRenderer.invoke("books:delete", id),
  handleDeleteBook: (callback: (result: APIResponse) => void) => ipcRenderer.on("books:delete", (_, data: APIResponse) => callback(data)),
  closeHandleDeleteBook: () => ipcRenderer.off("books:delete", () => {}),
  addBook: (data: IBook) => ipcRenderer.invoke("books:add", data),
  handleAddBook: (callback: (result: IBookAddRes) => void) => ipcRenderer.on("books:add", (_, data: IBookAddRes) => callback(data)),
  closeHandleAddBook: () => ipcRenderer.off("books:add", () => {}),
})

contextBridge.exposeInMainWorld("rent", {
  addRent: (params: IRentData) => ipcRenderer.invoke("rent:new", params),
  handleAddRent: (callback: (result: APIResponse) => void) => ipcRenderer.on("rent:new", (_, data: APIResponse) => callback(data)),
  closeHandleAddRent: () => ipcRenderer.off("rent:new", () => {}),
  editRent: (params: IRentEdit) => ipcRenderer.invoke("rent:edit", params),
  handleEditRent: (callback: (result: IRentEditRes) => void) => ipcRenderer.on("rent:edit", (_, data: IRentEditRes) => callback(data)),
  closeHandleEditRent: () => ipcRenderer.off("rent:edit", () => {}),
  deleteRent: (id: number) => ipcRenderer.invoke("rent:remove", id),
  handleDeleteRent: (callback: (result: APIResponse) => void) => ipcRenderer.on("rent:remove", (_, data: APIResponse) => callback(data)),
  closeHandleDeleteRent: () => ipcRenderer.off("rent:remove", () => {}),
  getAll: (page: number) => ipcRenderer.invoke("rent:getAllData", page),
  handleGetAll: (callback: (result: IBooksRentedResult) => void) => ipcRenderer.on("rent:getAllData", (_, data: IBooksRentedResult) => callback(data)),
  closeHandleGetAll: () => ipcRenderer.off("rent:getAllData", () => {})
})

contextBridge.exposeInMainWorld("updater", {
  getData: () => ipcRenderer.invoke("updater:getData"),
  handleGetData: (callback: (data: IUpdateData) => void) => ipcRenderer.on("updater:getData", (_, data: IUpdateData) => callback(data)) ,
  closeHandleGetData: () => ipcRenderer.off("updater:getData", () => {}),
})

contextBridge.exposeInMainWorld("testfunc", {
  test: () => ipcRenderer.invoke("test")
})

ipcRenderer.on("log:error", (_, data) => console.log(data))
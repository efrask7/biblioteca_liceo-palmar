import { contextBridge, ipcRenderer } from "electron";
import { Dispatch, SetStateAction } from "react";
import { IBookByIdResult, IBooksResult } from "./interface";
import { IRentData } from "./pages/books/RentBookModal";

contextBridge.exposeInMainWorld("windowAct", {
  close: () => ipcRenderer.invoke("window-close"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  minimize: () => ipcRenderer.invoke("window-minimize"),
  handleChange: (setState: Dispatch<SetStateAction<boolean>>) => ipcRenderer.on("window:resize", (_, data) => setState(data)),
  closeHandleChange: () => ipcRenderer.off("window:resize", null)
})

contextBridge.exposeInMainWorld("files", {
  open: () => ipcRenderer.invoke("file:open")
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
  closeHandleDeleteRent: () => ipcRenderer.off("rent:remove", () => {})
})
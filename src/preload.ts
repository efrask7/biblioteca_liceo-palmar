import { contextBridge, ipcRenderer } from "electron";
import { Dispatch, SetStateAction } from "react";
import { IBookByIdResult, IBooksResult } from "./interface";

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
  closeHandleGetBookById: () => ipcRenderer.off("books:findById", () => {})
})
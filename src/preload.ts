import { contextBridge, ipcRenderer } from "electron";
import { Dispatch, SetStateAction } from "react";
import { IBooksResult } from "./interface";

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
  closeHandleGetBooks: () => ipcRenderer.off("books:getBooks", null)
})
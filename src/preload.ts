import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("windowAct", {
  close: () => ipcRenderer.invoke("window-close"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  minimize: () => ipcRenderer.invoke("window-minimize")
})
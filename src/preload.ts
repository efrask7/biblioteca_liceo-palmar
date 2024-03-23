import { contextBridge, ipcRenderer } from "electron";
import { Dispatch, SetStateAction } from "react";

contextBridge.exposeInMainWorld("windowAct", {
  close: () => ipcRenderer.invoke("window-close"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  minimize: () => ipcRenderer.invoke("window-minimize"),
  handleChange: (setState: Dispatch<SetStateAction<boolean>>) => ipcRenderer.on("window:resize", (_, data) => setState(data)),
  closeHandleChange: () => ipcRenderer.off("window:resize", null)
})
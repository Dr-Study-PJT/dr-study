// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    doubleClickTitleBar: () => ipcRenderer.send('double-click-title-bar'),
});

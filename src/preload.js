// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});

if (!window.navigation) {
    contextBridge.exposeInMainWorld('navigation', {
        navigateTo: (page) => ipcRenderer.send('navigate-to', page),
        goBack: () => ipcRenderer.send('go-back'),
        goForward: () => ipcRenderer.send('go-forward'),
    });
}
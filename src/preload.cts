const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveIcon: (id: string, base64Data: string) => ipcRenderer.invoke('save-icon', id, base64Data),
    getIconPath: (id: string) => ipcRenderer.invoke('get-icon-path', id),
    deleteIcon: (id: string) => ipcRenderer.invoke('delete-icon', id)
});

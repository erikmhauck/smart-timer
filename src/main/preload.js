const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    buzz() {
      ipcRenderer.send('buzz');
    },
    displayOff() {
      ipcRenderer.send('displayOff');
    },
    on(channel, func) {
      const validChannels = [
        'buzz',
        'displayOff',
        'hotword',
        'partial-results',
        'final-results',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['buzz'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

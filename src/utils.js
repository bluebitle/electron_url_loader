
const { remote } = require('electron');

const urlBtn = document.getElementById('urlBtn');
const urlWidth = document.getElementById('urlWidth');
const urlHeight = document.getElementById('urlHeight');
const urlInput = document.getElementById('urlInput');


urlBtn.addEventListener('click', () => {

    const win = new remote.BrowserWindow({
        width: Number(urlWidth.value),
        height: Number(urlHeight.value),
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            nativeWindowOpen: true,
            webviewTag: true,
        }
    });
    win.setMenuBarVisibility(false);

    return win.loadURL(urlInput.value)
});



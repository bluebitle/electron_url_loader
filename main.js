const { app, BrowserWindow, autoUpdater, dialog } = require('electron');



function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            nativeWindowOpen: true,
            webviewTag: true,
        },
        resizable: false
    })
    win.setMenuBarVisibility(false);
    // win.loadURL('http://iken.kolon.com');
    win.loadFile("index.html")
}
app.whenReady().then(createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`
console.log( process.platform, app.getVersion() , url, '####################################')
autoUpdater.setFeedURL({ url })
setInterval(() => {
    // console.log( process.platform, app.getVersion(), app, process, url, '####################################')
    autoUpdater.checkForUpdates();
}, 60000)


autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: '새로운 버전이 다운로드 되었습니다. 업데이트를 적용하기 위해 앱을 재시작하세요.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})

autoUpdater.on('error', message => {
    console.error('애플리케이션을 업데이트하는 도중 오류가 발생하였습니다.')
    console.error(message)
})

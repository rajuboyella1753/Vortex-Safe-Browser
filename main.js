const { app, BrowserWindow, ipcMain, session, dialog, shell } = require('electron')
const path = require('path')

try {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
} catch (err) {}

const globalBlockedKeywords = ['xnxx', 'xhamster', 'pornhub', 'nude', 'sex', 'adult', 'xxx', 'redtube', 'brazzers', 'xvideos', 'porn'];
const adBlockDomains = ['doubleclick.net', 'googlesyndication.com', 'googleadservices.com', 'adservice.google.com', 'adnxs.com', 'ads.yahoo.com'];

function createWindow () {
  const win = new BrowserWindow({
    width: 1350,
    height: 850,
    frame: false,
    icon: path.join(__dirname, 'logo2.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  })

  // 1. నెట్‌వర్క్ లెవెల్ 18+ & AdBlocker ఫిల్టర్
  session.defaultSession.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
    let url = details.url.toLowerCase();
    
    for (let adDomain of adBlockDomains) {
      if (url.includes(adDomain)) {
        return callback({ cancel: true });
      }
    }

    for (let keyword of globalBlockedKeywords) {
      if (url.includes(keyword)) {
        return callback({ cancel: true });
      }
    }
    callback({ cancel: false });
  });

  // 2. డౌన్‌లోడ్ మేనేజర్ & లైవ్ ప్రోగ్రెస్ ట్రాకర్
  session.defaultSession.on('will-download', (event, item, webContents) => {
    const fileName = item.getFilename();
    const totalBytes = item.getTotalBytes();

    webContents.send('download-started', { fileName, totalBytes });

    item.on('updated', (event, state) => {
      if (state === 'progressing') {
        const receivedBytes = item.getReceivedBytes();
        const progress = totalBytes > 0 ? (receivedBytes / totalBytes) * 100 : 0;
        webContents.send('download-progress', { fileName, progress: progress.toFixed(1) });
      }
    });

    item.once('done', (event, state) => {
      if (state === 'completed') {
        webContents.send('download-completed', { fileName });
      } else {
        webContents.send('download-failed', { fileName });
      }
    });
  });

  win.loadFile('index.html')

  // పేజ్ సేవ్ చేయడానికి డైలాగ్ హ్యాండ్లర్
  ipcMain.handle('save-page-dialog', async (event, defaultName) => {
    const { filePath } = await dialog.showSaveDialog(win, {
      title: 'Save Webpage',
      defaultPath: defaultName || 'downloaded-page.html',
      filters: [{ name: 'Web Pages', extensions: ['html', 'htm'] }]
    });
    return filePath;
  });

  // డౌన్‌లోడ్స్ ఫోల్డర్ ఓపెన్ చేసే హ్యాండ్లర్
  ipcMain.on('open-downloads-folder', () => {
    shell.openPath(app.getPath('downloads'));
  });

  ipcMain.on('open-incognito-window', () => {
    const incognitoSession = session.fromPartition('strict-incognito-' + Date.now(), { cache: false });
    
    incognitoSession.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
      let url = details.url.toLowerCase();
      for (let keyword of globalBlockedKeywords) {
        if (url.includes(keyword)) {
          return callback({ cancel: true });
        }
      }
      callback({ cancel: false });
    });

    const incognitoWin = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true,
        partition: incognitoSession.storageBucket
      }
    });
    incognitoWin.loadURL('https://www.google.com/?safe=active');
  });

  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
  ipcMain.on('window-close', () => win.close());
  ipcMain.on('open-devtools', () => win.webContents.openDevTools());
}

app.whenReady().then(() => createWindow())
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
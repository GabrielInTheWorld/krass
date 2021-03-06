const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { format } = require('url');
const { join } = require('path');

let mainWindow;

function createMenu() {
    return new Menu();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        format({
            pathname: join(__dirname, `/dist/index.html`),
            protocol: 'file:',
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    Menu.setApplicationMenu(createMenu());
}

function openModal() {
    //   const { BrowserWindow } = require("electron");
    //   let modal = new BrowserWindow({
    //     parent: mainWindow,
    //     modal: true,
    //     show: false,
    //   });
    //   modal.loadURL("https://www.sitepoint.com");
    //   modal.once("ready-to-show", () => {
    //     modal.show();
    //   });
}

ipcMain.on('openModal', (event, args) => openModal());

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

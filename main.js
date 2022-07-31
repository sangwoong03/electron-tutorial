const { app, BrowserWindow, ipcMain } = require("electron");
const electronLocalshortcut = require("electron-localshortcut");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
		resizable: false,
	});

	electronLocalshortcut.register(win, "F12", () => {
		win.webContents.toggleDevTools();
	});

	electronLocalshortcut.register(win, "F5", () => {
		win.reload();
	});

	win.loadFile("kakaogun-electron/login.html");
};

app.whenReady().then(() => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

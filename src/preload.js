// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

// replace text
// window.addEventListener("DOMContentLoaded", () => {
// 	const replaceText = (selector, text) => {
// 		const element = document.getElementById(selector);
// 		if (element) element.innerText = text;
// 	};

// 	for (const type of ["chrome", "node", "electron"]) {
// 		replaceText(`${type}-version`, process.versions[type]);
// 	}
// });

// dark-mode
contextBridge.exposeInMainWorld("tutorial", {
	// timer
	send: (channel, data) => {
		const validChennels = ["timer"];
		if (validChennels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},
	// darkmode
	invoke: (channel, data) => {
		const validChennels = ["dark-mode:toggle, dark-mode:system"];
		if (validChennels.includes(channel)) {
			ipcRenderer.invoke(channel);
		}
	},
});

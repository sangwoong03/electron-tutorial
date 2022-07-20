// dark-mode

// const toggleBtn = document.querySelector("#toggle-dark-mode");
// const toggleSys = document.querySelector("#reset-to-system");
// const theme_source = document.querySelector("#theme-source");

// toggleBtn.addEventListener("click", async () => {
// 	const isDarkMode = await window.tutorial.toggle();
// 	theme_source.innerHTML = isDarkMode ? "Dark" : "Light";
// });

// toggleSys.addEventListener("click", async () => {
// 	await window.tutorial.system();
// 	theme_source.innerHTML = "System";
// });

// timer
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");

startBtn.addEventListener("click", async () => {
	await window.tutorial.invoke("timer");
});

stopBtn.addEventListener("click", () => {
	console.log("Stop");
});

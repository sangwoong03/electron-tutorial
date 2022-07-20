const toggleBtn = document.querySelector("#toggle-dark-mode");
const toggleSys = document.querySelector("#reset-to-system");
const theme_source = document.querySelector("#theme-source");

toggleBtn.addEventListener("click", async () => {
	const isDarkMode = await window.darkMode.toggle();
	theme_source.innerHTML = isDarkMode ? "Dark" : "Light";
});

toggleSys.addEventListener("click", async () => {
	await window.darkMode.system();
	theme_source.innerHTML = "System";
});

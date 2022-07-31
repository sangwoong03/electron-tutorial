const { user32 } = require("./ffi-api.js");
require("dotenv").config();

function kakaoLogin(kakaoId, kakaoPw) {
	const kakaoLoginHwnd = user32.FindWindowExA(0, 0, "EVA_Window", null);
	const idHwnd = user32.FindWindowExA(kakaoLoginHwnd, 0, "Edit", null);
	const pwHwnd = user32.FindWindowExA(kakaoLoginHwnd, idHwnd, "Edit", null);

	user32.SendMessageA(idHwnd, process.env.WM_SETTEXT, 0, kakaoId);
	user32.PostMessageA(idHwnd, process.env.WM_KEYDOWN, process.env.VK_TAB, 0);

	user32.SendMessageA(pwHwnd, process.env.WM_SETTEXT, 0, kakaoPw);
	user32.PostMessageA(pwHwnd, process.env.WM_KEYDOWN, process.env.VK_RETURN, 0);
}

module.exports = {
	kakaoLogin,
};

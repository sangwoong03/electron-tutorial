const { user32, KAKAO_HANDLE } = require("./ffi-api.js");
const iconv = require("iconv-lite");
require("dotenv").config();

function findKakaoUser(clientName) {
	const CLIENT_NAME = iconv.encode(clientName, "euc-kr"); // first : clientName

	const childWindow = user32.FindWindowExA(
		KAKAO_HANDLE,
		0,
		"EVA_ChildWindow",
		null,
	);
	const contactList = user32.FindWindowExA(childWindow, 0, "EVA_Window", null);
	const edit = user32.FindWindowExA(contactList, 0, "Edit", null);

	user32.SendMessageA(edit, process.env.WM_SETTEXT, 0, CLIENT_NAME);
	user32.PostMessageA(edit, process.env.WM_KEYDOWN, process.env.VK_RETURN, 0);
}

function sendKakaoMessage(templateText) {
	const TEMPLATE_TEXT = iconv.encode(templateText, "euc-kr"); // first: templateText

	const chatRoom = user32.FindWindowExA(0, 0, "#32770", null);
	const chatInput = user32.FindWindowExA(chatRoom, 0, "RichEdit50W", null);

	user32.SendMessageA(chatInput, process.env.WM_SETTEXT, 0, TEMPLATE_TEXT);
	user32.PostMessageA(
		chatInput,
		process.env.WM_KEYDOWN,
		process.env.VK_RETURN,
		0,
	);
}

function activeChat(clientName, templateText, setDelayTime) {
	findKakaoUser(clientName);
	setTimeout(function () {
		console.log("a");
		sendKakaoMessage(templateText);
	}, setDelayTime);
}

function activeChatMain(clientName = [], templateText, setDelayTime) {
	let idx = 0;
	while (idx < clientName.length) {
		activeChat(clientName[idx], templateText, setDelayTime);

		if (clientName.length === 1) {
			activeChat(clientName[0], templateText, setDelayTime);
			break;
		}

		idx++;
	}
}

activeChatMain();
// activeChat();
module.exports = {
	activeChatMain,
};

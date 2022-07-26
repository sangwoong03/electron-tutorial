const ffi = require("ffi-napi");
const ref = require("ref-napi");
const iconv = require("iconv-lite");

let BUF = Buffer.alloc(255);

const user32 = ffi.Library("user32.dll", {
	GetWindowTextA: ["long", ["long", "string", "long"]],
	GetClassNameA: ["long", ["long", "string", "long"]],
	FindWindowExA: ["long", ["long", "long", "string", "string"]],
	SendMessageA: ["long", ["long", "int32", "uint32", "string"]],
	GetClassLongA: ["long", ["long", "int32"]],
	SetWindowTextA: ["bool", ["long", "string"]],
	PostMessageA: ["bool", ["long", "int32", "long", "long"]],
});

// 윗부분 중복
// 모듈로 만들 필요 있음.

// 카카오 로그인
function kakaoLogin() {
	// 로그인 창
	const hwnd = user32.FindWindowExA(0, 0, "EVA_Window", null);
	console.log(hwnd);

	// 아이디 넣기
	const hwndId = user32.FindWindowExA(hwnd, 0, "Edit", null);
	user32.GetWindowTextA(hwndId, BUF, 255);
	const text = ref.readCString(BUF, 0);
	console.log(hwndId, text);
	const USER_ID = "can7063@hanmail.net";
	user32.SendMessageA(hwndId, 0x000c, 0, USER_ID);
	// VK_TAB
	// 0x09

	user32.PostMessageA(hwndId, 0x0100, 0x09, 0);
	// // 비밀번호 넣기
	const hwndPw = user32.FindWindowExA(hwnd, hwndId, "Edit", null);
	const USER_PW = "dndtkd6795@";
	user32.SendMessageA(hwndPw, 0x000c, 0, USER_PW);
	user32.PostMessageA(hwndId, 0x0100, 0x0d, 0);
}
kakaoLogin();

// 로그인이 되면
// EVA_Window_Dbclk를 찾아서 다음 로직 진행

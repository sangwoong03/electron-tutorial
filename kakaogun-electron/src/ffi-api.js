const ffi = require("ffi-napi");
const ref = require("ref-napi");

const voidPtr = ref.refType(ref.types.void);
const user32 = ffi.Library("user32.dll", {
	EnumWindows: ["bool", [voidPtr, "int32"]],
	GetWindowTextA: ["long", ["long", "string", "long"]],
	GetClassNameA: ["long", ["long", "string", "long"]],
	FindWindowExA: ["long", ["long", "long", "string", "string"]],
	SendMessageA: ["long", ["long", "int32", "uint32", "string"]],
	SetWindowTextA: ["bool", ["long", "string"]],
	PostMessageA: ["bool", ["long", "int32", "long", "long"]],
});

const KAKAO_HANDLE = user32.FindWindowExA(0, 0, "EVA_Window_Dblclk", null);

// let KAKAO_APP;
// const enumWindowProc = ffi.Callback(
// 	"bool",
// 	["long", "int32"],
// 	function (hwnd, IParama) {
// 		buf = Buffer.alloc(255);
// 		user32.GetWindowTextA(hwnd, buf, 255);
// 		const text = ref.readCString(buf, 0);

// 		if (text.indexOf("KakaoTalk.exe") >= 0) {
// 			console.log("FOUND:", text, hwnd);
// 			KAKAO_APP = hwnd;
// 			const a = user32.GetClassNameA(KAKAO_APP, buf, 255);
// 			console.log("ClassName :: ", a);
// 			return true;
// 		}
// 		return false;
// 	},
// );

// user32.EnumWindows(enumWindowProc, 0);

module.exports = {
	user32,
	KAKAO_HANDLE,
};

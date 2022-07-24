import ffi from "ffi-napi";
import ref from "ref-napi";
// console.log(ffi);
// console.log(ref.refType);

const voidPtr = ref.refType(ref.types.void);
const stringPtr = ref.refType(ref.types.CString);

const user32 = ffi.Library("user32.dll", {
	EnumWindows: ["bool", [voidPtr, "int32"]],
	GetWindowTextA: ["long", ["long", "string", "long"]],
	GetClassNameA: ["long", ["long", "string", "long"]],
	FindWindowExA: ["long", ["long", "long", "string", "string"]],
	SendMessageA: ["int32", ["long", "int32", "uint32", "long"]],
	GetClassLongA: ["long", ["long", "int32"]],
});

let handle = null;
let buf;
const enumWindowProc = ffi.Callback(
	"bool",
	["long", "int32"],
	function (hwnd, IParama) {
		buf = Buffer.alloc(255);
		user32.GetWindowTextA(hwnd, buf, 255);
		// title bar name into length
		// console.log(b);
		const text = ref.readCString(buf, 0);
		// window text
		// console.log(text);
		if (text.indexOf("kakao") >= 0) {
			console.log("FOUND:", text, hwnd);
			handle = hwnd;
			const a = user32.GetClassNameA(handle, buf, 255);
			console.log("ClassName :: ", a);

			return true;
		}
		return false;
	},
);
// 첫번째 실행 중인 프로그램
const hwnd = user32.FindWindowExA(0, 0, null, null);
console.log(hwnd);

// 카카오톡 프로그램 핸들 찾기
const hwnd2 = user32.FindWindowExA(0, 0, "EVA_Window_Dblclk", null);

// 카카오톡 하위 프로그램 창 핸들 찾기
const hwnd3 = user32.FindWindowExA(hwnd2, 0, "EVA_ChildWindow", null);
console.log(hwnd2);
console.log(hwnd3);

buf = Buffer.alloc(255);

// 텍스트 찾기
const kakaoTalk = user32.GetWindowTextA(hwnd2, buf, 255);
const kakaoChildWindow = user32.GetWindowTextA(hwnd3, buf, 255);

// 빈 버퍼에 담아서 첫번째 문자열을 출력
// 단계별로 진행해야함.
const text = ref.readCString(buf, 0);

// 결과
console.log(kakaoTalk);
console.log(kakaoChildWindow, text);

// 위 함수 실행
// user32.EnumWindows(enumWindowProc, 0);
//
//
// win32 api 불러오기
// import { User32 } from "win32-api/promise";
// const user32 = User32.load();
// const firstHwnd = await user32.FindWindowExW(0, 0, null, null);
// console.log(firstHwnd);
// const kakaoTitle = Buffer.from("KakaoTalk.exe");
// console.log(kakaoTitle.toString());
// const kakaoHwnd = await user32.FindWindowExW(0, 0, null, null);
// console.log(kakaoHwnd);
// if (handle) {
// 	const wParam = 1000;
// 	const msgld = 9999;

// 	user32.SendMessageA(handle, msgld, wParam, 0);
// }

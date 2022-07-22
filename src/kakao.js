// import ffi from "ffi-napi";
// import ref from "ref-napi";
// // console.log(ffi);
// // console.log(ref.refType);

// const voidPtr = ref.refType(ref.types.void);
// const stringPtr = ref.refType(ref.types.CString);

// const user32 = ffi.Library("user32.dll", {
// 	EnumWindows: ["bool", [voidPtr, "int32"]],
// 	GetWindowTextA: ["long", ["long", stringPtr, "long"]],
// 	GetClassNameA: ["long", ["long", stringPtr, "long"]],
// 	FindWindowExA: ["long", ["long", "long", stringPtr, stringPtr]],
// 	SendMessageA: ["int32", ["long", "int32", "uint32", "long"]],
// 	GetClassLongA: ["long", ["long", "int32"]],
// });

// let handle = null;
// let buf;

// const enumWindowProc = ffi.Callback(
// 	"bool",
// 	["long", "int32"],
// 	function (hwnd, IParama) {
// 		buf = Buffer.alloc(255);
// 		user32.GetWindowTextA(hwnd, buf, 255);
// 		// title bar name into length
// 		// console.log(b);
// 		const text = ref.readCString(buf, 0);
// 		// window text
// 		console.log(text);

// 		if (text.indexOf("Kakao") >= 0) {
// 			console.log("FOUND:", text, hwnd);
// 			handle = hwnd;
// 			const a = user32.GetClassNameA(handle, buf, 255);
// 			console.log("ClassName :: ", a);
// 			return true;
// 		}
// 		return false;
// 	},
// );
// const hwnd = user32.FindWindowExA(0, 0, null, null);
// console.log(hwnd);
// const kakaoTitle = Buffer.from("EVA_Window_Dbclk");
// const kakaoHwnd = user32.FindWindowExA(hwnd, 0, kakaoTitle, null);
// console.log(kakaoHwnd);

// user32.EnumWindows(enumWindowProc, 0);
// 위에 걸로 하면 카카오톡이 한글로 안뜸 (인코딩 문제 같은데 모르겠음)

// could find out Window-Text with this code below:
// 0X00020258 is handle name (hwnd) for EVA_Window_Dbclick
// 0X00020258 always changing
// ==========================================code==========================================
// const kakotalk = user32.GetWindowTextA(0x00020258, buf, 255);
// const a = Buffer.from(kakotalk.toString());
// console.log(a.toString("utf8"));

// The first program's handle value in local

// function a() {
// 	let buf = Buffer.alloc(255)
// 	let handle

// 	while (firstHwnd === True) {
// 		handle = hwnd
// 		user32.GetClassNameA(hwnd, buf, 255)

// 	}
// }
//
//
//
import { User32 } from "win32-api/promise";
const user32 = User32.load();
const firstHwnd = await user32.FindWindowExW(0, 0, null, null);
console.log(firstHwnd);
const kakaoTitle = Buffer.from("KakaoTalk.exe");
console.log(kakaoTitle.toString());
const kakaoHwnd = await user32.FindWindowExW(firstHwnd, 0, kakaoTitle, null);
console.log(kakaoHwnd);
// if (handle) {
// 	const wParam = 1000;
// 	const msgld = 9999;

// 	user32.SendMessageA(handle, msgld, wParam, 0);
// }

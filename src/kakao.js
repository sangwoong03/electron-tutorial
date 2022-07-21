import ffi from "ffi-napi";
import ref from "ref-napi";
console.log(ffi.Library);

const voidPtr = ref.refType(ref.types.void);
const stringPtr = ref.refType(ref.types.CString);

const user32 = ffi.Library("user32.dll", {
	EnumWindows: ["bool", [voidPtr, "int32"]],
	GetWindowTextA: ["long", ["long", stringPtr, "long"]],
	GetClassNameA: ["long", ["long", stringPtr, "long"]],
});

let handle, buf;

const enumWindowProc = ffi.Callback(
	"bool",
	["long", "int32"],
	function (hwnd, IParama) {
		buf = Buffer.alloc(255);
		const b = user32.GetWindowTextA(hwnd, buf, 255);
		// title bar name into length
		// console.log(b);
		const name = ref.readCString(buf, 0);
		// title bar name
		console.log(name);

		if (name.indexOf("KakaoTalkShadowWnd") >= 0) {
			console.log("FOUND:", name, hwnd);
			handle = hwnd;
			const a = user32.GetClassNameA(hwnd, buf, 255);

			console.log(a);
			return true;
		}
		return false;
	},
);

user32.EnumWindows(enumWindowProc, 0);

// console.log(ref);

// import { User32 } from "win32-api/promise";

// const user32 = User32.load();

// const hWnd = await user32.FindWindowExW(0, 0, null, null);
// const text = await user32.GetWindowTextA(hWnd, "Eva_childWindow");
// const kakaoTalk = await user32.GetClassName(11732, null, 100);
// console.log(User32);
// console.log(hWnd.length);
// console.log(kakaoTalk);

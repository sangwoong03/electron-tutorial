const ffi = require("ffi-napi");
const ref = require("ref-napi");
const iconv = require("iconv-lite");

const user32 = ffi.Library("user32.dll", {
	GetWindowTextA: ["long", ["long", "string", "long"]],
	GetClassNameA: ["long", ["long", "string", "long"]],
	FindWindowExA: ["long", ["long", "long", "string", "string"]],
	SendMessageA: ["long", ["long", "int32", "uint32", "string"]],
	GetClassLongA: ["long", ["long", "int32"]],
	SetWindowTextA: ["bool", ["long", "string"]],
	PostMessageA: ["bool", ["long", "int32", "long", "long"]],
});

let KAKAO_HANDLE = null;
let BUF = Buffer.alloc(255);

// 카카오 윈도우 텍스트 이름 변경
function changeKakakoText() {
	// 카카오톡 프로그램 윈도우 핸들 찾기
	const hwnd = user32.FindWindowExA(0, 0, "EVA_Window_Dblclk", null);
	KAKAO_HANDLE = hwnd;
	console.log(`KakaoMain :: ${KAKAO_HANDLE}`);

	if (KAKAO_HANDLE) {
		// 카카오톡 메인창 텍스트 변경
		user32.SetWindowTextA(KAKAO_HANDLE, "KakaoTalkMain");
		return KAKAO_HANDLE;
	} else {
		return (KAKAO_HANDLE = 0);
	}
}
changeKakakoText();

// 카카오톡 채팅 발송
function activeChat() {
	// 카카오톡 메인창 하위 프로그램 접근
	const childWindow = user32.FindWindowExA(
		KAKAO_HANDLE,
		0,
		"EVA_ChildWindow",
		null,
	);
	user32.GetWindowTextA(childWindow, BUF, 255); // 텍스트 찾기
	const childText = ref.readCString(BUF, 0);
	console.log(`KakaoChild :: ${childWindow}, ${childText}`);

	// 첫번째 항목
	const contactList = user32.FindWindowExA(childWindow, 0, "EVA_Window", null);
	const edit = user32.FindWindowExA(contactList, 0, "Edit", null);
	console.log(`search_bar :: ${edit}`);

	// 인코딩
	const nameList = ["승채", "김다", "건모", "성재"];

	for (let i = 0; i < nameList.length; i++) {
		const name = iconv.encode(nameList[i], "euc-kr");
		// 검색창 검색어 넣기
		// WM_SETTEXT = 0x000c
		user32.SendMessageA(edit, 0x000c, 0, name);

		// 검색리스트 중 가장 맨위 카톡방 열기
		// *********************************** 이미 카톡방이 열려있을 때 로직 짜야됨
		// WM_KEYDOWN = 0x0100
		// VK_RETURN = 0x26
		user32.PostMessageA(edit, 0x0100, 0x0d, 0);

		if (edit) {
			setTimeout(() => {
				const chatRoom = user32.FindWindowExA(0, 0, "#32770", null);
				const chatInput = user32.FindWindowExA(
					chatRoom,
					0,
					"RichEdit50W",
					null,
				);
				const text = iconv.encode("안녕하세요", "euc-kr");
				user32.SendMessageA(chatInput, 0x000c, 0, text);
				user32.PostMessageA(chatInput, 0x0100, 0x0d, 0);
			}, 200);
		}
	}
}
activeChat();

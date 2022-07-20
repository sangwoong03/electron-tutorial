## 레포지토리 개요

- 해당 레포지토리는 `Electron` 튜토리얼 공부 레포지토리입니다.

:: 참고

- [공식문서 en](https://www.electronjs.org/)
- [한글 버전](https://tinydew4.github.io/electron-ko)
- [Youtube](https://www.youtube.com/watch?v=3yqDxhR2XxE&t=518s)

## ✅ Electron Tutorial

- 데스크탑 애플리케이션을 만들 수 있는 크로스(멀티) 플랫폼

- 기존의 웹앱이 있다면 `.exe` 확장자 명의 실행 파일로 데스크탑 앱 생성 가능

## ✅ 초기 세팅

### 📌 1. npx

```
npx create-electron-app "app-name"
```

<br>

### 📌 2. npm

```
mkdir "앱 이름"

cd "앱 이름"
```

```
npm install --save-dev electron
```

`package.json`

```
// package.json

{
  "name": 기존 설정한 이름,
  "version": "1.0.0",
  "description": 프로젝트 또는 앱 설명,
  "main": "main.js",
  "author": 사용자 이름,
  "license": "MIT"
}

// scripts 내용에 추가

{
  "scripts": {
    "start": "electron ."
  }
}
```

### 📌 3. 일렉트론 실행

```
npm start
```

<br>
<br>

## ✅ Process

- 일렉트론은 `chromium`의 다중 프로세스 아키텍처를 상속

- 웹 브라우저와 비슷한 구조

- 웹 브라우저는 구조적으로 복잡한 애플리케이션으로서,  
  하나의 브라우저가 여러 탭을 관리하거나 써드파티 (third-party) 익스텐션을 로드하는 등  
  컨텐츠를 화면에 표시하는 것 외에도 부수적인 기능 존재

### 📌 Single Process

- 초기의 브라우저는 이 모든 기능을 하나의 프로세스로 처리
- 문제점: 웹 사이트 하나를 종료해도 전체 브라우저에 영향

### 📌 Multi Process

- `Chrome`에서 각각의 탭을 별도의 프로세스에서 렌더링
- 하나의 웹사이트에서 오류가 발생해도 전체 브라우저에 영향을 미치지 않음.

<br>

일렉트론 어플리케이션도 이와 유사하고 `Main`과 `Renderer` 두 유형의 프로세스를 관리하여 개발을 진행할 것입니다.

<br>

### 📌 Main Process

<br>

### 📌 Rendere Process

<br>
<br>

## Tutorial: nativeTheme

사용자 임의로 인터페이스를 바꾸는 방법에 대한 튜토리얼 소개

### 📌 다크모드/라이트모드 전환

1. Main:: `natvieTheme` 모듈의 `themeSource` 속성 사용하기

   - 설정한 `themeSource` 속성 값은 Renderer 프로세스로 전달
   - CSS 파일에서 `prefers-color-scheme` 미디어 쿼리를 통해 UI 변경
   - `ipcMain.handle()`을 사용하여 Renderer 프로세스에서 `dark-mode` 채널로 보내는 메시지 수신
     <br>

2. Preload:: `window` 객체에 `darkMode`라는 새로운 API 추가

   - dark-mode:toggle : `dark-mode` 채널에 `toggle` 메서드 할당
   - dark-mode:system : `dark-mode` 채널에 `system` 메서드 할당
   - `ipcRenderer.invoke()`을 사용하여 `dark-mode` 채널을 통해 Renderer 프로세스에서 Main 프로세스로 메시지 송신
     <br>

3. Rendere:: `button` 태그 이벤트 리스너 추가

   - 이벤트리스너를 통해 `HTML` 태그에 이벤트 추가
   - 각각의 이벤트를 통해 `window.darkMode`의 `toggle()`, `system()` 메서드를 호출

4. Dark/Light 모드 전환은 잘 되나 system 버튼을 눌렀을 때 다음 에러 발생

```
Uncaught (in promise) Error:
Error invoking remote method 'dark-mode:system':
No handler registered for 'dark-mode:system'
```

아직 에러 원인 모르겠으나

https://runebook.dev/ko/docs/electron/api/native-theme 참조에 의하면,

- `nativeTheme.themeSource​` 속성의 값으로 system, light, dark 세가지를 가질 수 있음.

1. `system` 설정 시 모든 것이 OS 기본 값으로 재설정.

2. `dark`로 설정 시 모든 UI가 어두운 UI로 변경.

   - `nativeTheme.shouldUseDarkColors ` === true
   - 만약 렌더링되는 화면을 바꾸기 위해서는 CSS 파일에서 미디어쿼리 사용해야함

3. `light`로 설정 시 모든 UI가 밝은 UI로 변경.
   - `nativeTheme.shouldUseDarkColors ` === false
   - 만약 렌더링되는 화면을 바꾸기 위해서는 CSS 파일에서 미디어쿼리 사용해야함

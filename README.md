## 레포지토리 개요

- 해당 레포지토리는 `Electron` 튜토리얼 공부 레포지토리입니다.

:: 참고

- [공식문서 en](https://www.electronjs.org/)
- [한글 버전](https://tinydew4.github.io/electron-ko)
- [참고용 블로그](https://programmerk.tistory.com/55)

## ✅ Electron Tutorial

- 데스크탑 애플리케이션을 만들 수 있는 크로스(멀티) 플랫폼

- 기존의 웹앱이 있다면 `.exe` 확장자 명의 실행 파일로 데스크탑 앱 생성 가능

## ✅ 초기 세팅 :: Only Electron

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

## ✅ 초기 세팅 :: Vue on Electron

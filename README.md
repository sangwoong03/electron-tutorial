## 레포지토리 개요

- 해당 레포지토리는 `Electron` 튜토리얼 공부 레포지토리입니다.

### :: References

- [공식문서 en](https://www.electronjs.org/)
- [공식문서 ko](https://tinydew4.github.io/electron-ko)
- [참고용 블로그](https://programmerk.tistory.com/55)

<br>
<br>

## ✅ Electron Tutorial

- 데스크탑 애플리케이션을 만들 수 있는 크로스(멀티) 플랫폼

- 기존의 웹앱이 있다면 `.exe` 확장자 명의 실행 파일로 데스크탑 앱 생성 가능

<br>
<br>

## ✅ Initial Settings :: Only Electron

<br>

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

<br>

### 📌 3. start electron app

```
npm start
```

<br>
<br>

## ✅ Electron Deploy & Auto Updater

Vue, React 등 다른 Framework를 사용하였을 때의 배포 및 자동 업데이트 과정도 추가 할 예정입니다.

우선 `HTML5` 그리고 `Javascript` 를 활용하였을 때의 배포 및 자동 업데이트 과정은 해당 블로그를 참조해주세요. [이동](https://velog.io/@sangwoong/Electron-3.-%EC%9D%BC%EB%A0%89%ED%8A%B8%EB%A1%A0-%EB%B0%B0%ED%8F%AC-%EB%B0%8F-%EC%9E%90%EB%8F%99-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8)
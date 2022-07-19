## ✅ Electron Tutorial

데스크탑 애플리케이션을 만들 수 있는 크로스(멀티) 플랫폼

기존의 웹앱이 있다면 `.exe` 확장자 명의 실행 파일로 데스크탑 앱 생성 가능

## ✅ 초기 세팅

### 📌 1. npx

```
npx create-electron-app "app-name"
```

다음 명령어를 통해 세팅한 경우 package.json 파일을 직접 수정할 소요가 거의 없습니다.

<br>

### 📌 2. npm

```
mkdir "앱 이름"

cd "앱 이름"
```

일렉트론 프로젝트를 시작할 디렉토리 경로에서 다음 명령어를 입력해줍니다.

```
npm install --save-dev electron
```

아래 내용을 추가해주세요.

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

일렉트론은 `chromium`의 다중 프로세스 아키텍처를 상속받습니다.

웹 브라우저와 비슷한 구조를 갖고 있습니다.

웹 브라우저는 구조적으로 복잡한 애플리케이션으로서,  
하나의 브라우저가 여러 탭을 관리하거나 써드파티 (third-party) 익스텐션을 로드하는 등  
컨텐츠를 화면에 표시하는 것 외에도 부수적인 기능들이 많습니다.

### 📌 Single Process

초기의 브라우저는 이 모든 기능을 하나의 프로세스로 처리하여 브라우저의 탭을 줄였지만, 웹 사이트 하나를 종료해도 전체 브라우저에 영향을 미쳤습니다.

### 📌 Multi Process

이런 문제를 해결하기 위해 `Chrome`에서는 각각의 탭을 별도의 프로세스에서 렌더링하여 하나의 웹사이트에서 오류가 발생해도 전체 브라우저에 영향을 미치지 않도록하였습니다.

<br>

일렉트론 어플리케이션도 이와 유사하고 `Main`과 `Renderer` 두 유형의 프로세스를 관리하여 개발을 진행할 것입니다.

<br>

### 📌 Main Process

<br>

### 📌 Rendere Process

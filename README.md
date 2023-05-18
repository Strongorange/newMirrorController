# SmartMirror Controller

> [**스마트미러 🌐**](http://github.com/Strongorange/newMirror/tree/dev-user)를 제어하기 위한 모바일 앱 입니다.

## 기술 스택

> 언어

- Typescript

> 프레임워크

- React Native

> Front-End

- Styled-Components

> DB, Storage

- Firebase(Storage, Firestore)

## TODO

1. 로그인 기능
   1. [x] 로그인 화면
   2. 회원가입 화면
   3. 비밀번호 찾기 화면
2. 유저별 선택지역 1개 설정
   1. 선택한 지역에 따른 미세먼지 정보 제공
      1. 선택한 지역의 tmX,tmY 정보를 가져와 웹에서 읽을 수 있게 Firestore에 저장 (settings 문서)
3. 메세지
   1. [x] Firestore 에서 Messages 가져오기
   2. 메시지 CUD
      1. [x] Create
      2. Update
      3. Delete

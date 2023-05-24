# SmartMirror Controller
> [**스마트 미러 🌐**](http://github.com/Strongorange/newMirror/tree/dev-user)를 제어하기 위한 모바일 앱입니다.  
> 스마트 미러는 현재 위치의 `온도`, `날씨`, `미세먼지 레벨`, 앱에서 지정한 측정소의 `미세먼지 레벨`, `날씨, 시간별 메세지`, 앱에서 정한 `사진`을 표시해 줍니다.

![미러 사진 바꾸기-0001](https://github.com/Strongorange/newMirrorController/assets/74127841/d79c367a-b934-4e3c-8e13-0e8904e4352d)


# 1. 제작 기간
- 2022.08 ~ 2022.08 (개인용)
- 2023.04 ~ 2023.05 (TypeScript 적용 및 배포용)

# 2. 사용 기술
### `공통`
- Firebase
   - Auth  
   - Storage
   - Firestore DB
- TypeScript
### `Web`
- React.js
### `App`
- React Native


# 3. 핵심 기능
이 앱은 스마트 미러에 날씨, 시간별로 어떤 메세지를 보여줄지, 어떤 미세먼지 측정소의 데이터를 보여줄지, 어떤 사진들을 보여줄지 선택하는 컨트롤러 입니다.

## 3.1 Firebase Storage에 사진 및 동영상 CRUD
- 유저는 앱에서 Storage에 사진 및 동영상을 업로드 할 수 있습니다.
- 유저가 선택한 미디어가 `동영상`일 경우 FFMPEG를 사용해 `gif`로 변환 후 Storage에 업로드합니다.  
- 업로드된 사진은 언제나 삭제할 수 있습니다.

## 3.2 Storage에서 선택한 사진(사진 및 gif) 스마트 미러에 보여주기
- 유저는 앱에서 스마트 미러에 출력할 사진을 Storage 에서 최대 4개까지 정할 수 있습니다.

## 3.3 주소별 미세먼지 측정소 조회 및 저장
- [한국환경공단 측정소 정보 Open API](data.go.kr/data/15073877/openapi.do#tab_layer_detail_function)를 사용해 주소별 측정소 정보를 조회 후 DB에 저장합니다.
- 스마트 미러 웹은 이 정보를 사용해 [한국환경공단 대기오염 정보 Open API](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861)에서 대기질 정보를 조회해 보여줍니다.

## 3.4 날씨, 시간대별 출력 메세지 CRUD
- 날씨, 시간대별로 스마트 미러에 출력할 메세지를 관리할 수 있습니다.

# 4. 핵심 트러블 슈팅
## 4.1 리팩토링 전 기능에 비해서 처참한 앱의 퍼포먼스 문제
- 리팩토링 전 개인용으로 사용하고있던 앱은 단순한 사진 CRUD 기능밖에 없음에도 불구하고 단순 스크롤에도 렉이 심한 퍼포먼스 문제가 존재했습니다.


# 5. 기타 트러블 슈팅
## 5.1 JavaScript 프로젝트를 TypeScript 프로젝트로
- 이미 JS로 진행했던 프로젝트를 TS로 바꾸는 과정에서 


## TODO

1. 로그인 기능
   1. [x] 로그인 화면
   2. 회원가입 화면
   3. 비밀번호 찾기 화면
2. 유저별 선택지역 1개 설정
   1. 선택한 지역에 따른 미세먼지 정보 제공
      1. [x] 시(서울, 대전, 대구....)별 미세먼지 측정소 리스트 가져오기
      2. [x] 측정소 선택해서 settings에 측정소 정보 저장
      <!-- 3. 선택한 지역의 tmX,tmY 정보를 가져와 웹에서 읽을 수 있게 Firestore에 저장 (settings 문서) -->
3. 메세지
   1. [x] Firestore 에서 Messages 가져오기
   2. 메시지 CUD
      1. [x] Create
      2. [x] Update
      3. [x] Delete

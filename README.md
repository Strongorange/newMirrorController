# SmartMirror Controller

> [**스마트 미러 🌐**](http://github.com/Strongorange/newMirror/tree/dev-user)를 제어하기 위한 모바일 앱입니다.  
> 스마트 미러는 현재 위치의 `온도`, `날씨`, `미세먼지 레벨`, 앱에서 지정한 측정소의 `미세먼지 레벨`, `날씨, 시간별 메세지`, 앱에서 정한 `사진`을 표시해 줍니다.

![미러 사진 바꾸기-0001](https://github.com/Strongorange/newMirrorController/assets/74127841/d79c367a-b934-4e3c-8e13-0e8904e4352d)
![image](https://github.com/Strongorange/newMirrorController/assets/74127841/844d3547-b3b1-446b-9325-ba8d8773dd2a)

# 1. 제작 기간

- 2022.08 ~ 2022.08 (개인용)
- 2023.04 ~ 2023.05 (TypeScript 적용 및 배포용)

</br>

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

</br>

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

</br>

# 4. 핵심 트러블 슈팅

## 4.1 리팩토링 전 기능에 비해서 처참한 앱의 퍼포먼스 문제

- 리팩토링 전 개인용으로 사용하고있던 앱은 단순한 사진 CRUD 기능밖에 없음에도 불구하고 단순 스크롤에도 렉이 심한 퍼포먼스 문제가 존재했습니다.
- 이를 해결하기 위해서 `코드 스플리팅`, `memoization`, `Presenter Container Pattern`등을 사용해 최적화를 진행했습니다.
- [🌐 **리팩토링 전 App.js**](https://github.com/Strongorange/newMirrorController/blob/17e1e7da6aa9f92f256f523b20253be818ec9f5e/App.js#L1-L433)
  - 코드 스플리팅 없이 앱의 모든 기능이 App.js에 존재합니다.
  - 이로인해 App.js의 코드가 길어지고, 컴포넌트가 불필요하게 리렌더링 되는 문제가 발생합니다.
- [🌐 **리팩토링 후 App.tsx**](https://github.com/Strongorange/newMirrorController/blob/26454a3083eeaf1bb3a1b30fc2f5211e71fb5c44/App.tsx#L1-L46)
  - 코드 스플리팅을 통해 컴포넌트를 분리했습니다.
  - 앱의 기능이 훨씬 더 다양해지고 복잡해졌음에도 불구하고 동일한 역할을 하는 컴포넌트에서 성능이 훨씬 더 좋아졌습니다.

## 4.2 React Native에서 FFMPEG 사용할때 에뮬레이터와 실제 기기의 파일 경로 차이

- Storage에 비디오를 업로드한다면 용량이 너무 커서 앱의 퍼포먼스에 악영향을 미치고, 스마트 미러에 출력할 때도 너무 느려질 것 같다고 생각해 gif로 변환해서 업로드하기로 했습니다.
- 에뮬레이터로 테스트할 때는 문제가 없었지만 실제 기기에서 테스트할 때는 gif가 변환되지 않고 Storage에 `blob` 형태로 업로드되는 문제가 발생했습니다.
- 확인결과 에뮬레이터와 실제 기기의 파일 경로가 다르기 때문에 발생하는 문제였습니다.
- [🌐 **코드 비교**](https://github.com/Strongorange/newMirrorController/commit/a72df01d3129c9d46df83457f9b7d88ba44756d6?diff=split#diff-9b5b5955d0e684e7904f3fc143e07aaa11b7e7c3b36d10985c4aff2554940cbfR352-R368)
  - `RNFS.readDir`로 가져온 파일 경로에서 동영상 변환때 지정해준 이름을 가진 파일을 찾아 그 경로를 사용해 파일을 업로드해 에뮬레이터, 실제 기기 모두에서 동일하게 동작하도록 했습니다.

## 4.3 React Native Firebase Auth의 onAuthStateChanged()가 예상대로 작동하지 않는 문제

- onAuthStateChanged()가 반환하는 유저 정보가 이미 이전에 로그아웃한 유저의 정보인 경우가 발생했습니다.
- `에뮬레이터`, `실제 기기`, 모두에서 동일한 문제가 발생하였고 `앱`과 `Firebase` 패키지 재설치, `캐시 초기화`, `함수 위치 변경` 등 의 시도를 해봤지만 문제가 해결되지 않았습니다.
- `onAuthStateChanged()` 함수를 사용하지 않고 `Recoil`과 `Recoil Persist`를 사용해 유저 정보를 관리하는 방법으로 문제를 해결했습니다.
- [🌐 **코드 비교**](https://github.com/Strongorange/newMirrorController/commit/1c16c87c1eebf486b0232d5443fdd849e1aad594#diff-a369d17a5dcc6a08663afe8ec644ed0ebc2624f39b704924078c01fd52c58fa3)
  - `react-native-recoil-persist` 패키지를 사용해 `Recoil` 상태를 `AsyncStorage`에 저장하고, 앱이 실행될 때 `AsyncStorage`에서 유저 정보를 불러와 이를 사용하여 로그인 여부를 판단하도록 했습니다.

</br>

# 5. 기타 트러블 슈팅

## 5.1 [🌐 JavaScript 프로젝트를 TypeScript 프로젝트로 변환](https://github.com/Strongorange/TIL/blob/main/Typescript/JS%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC%20TS%EB%A1%9C.md)

## 5.2 React Navigation과 TypeScript 연동

- JS 프로젝트를 TS 프로젝트로 변환하면서 React Navigation에 필요한 타입들을 추가해야 했습니다.
- 생각보다 많은 타입들이 필요했고 `공식문서`와 `Stack Overflow`를 참고해서 타입들을 추가했습니다.

</br>

# 6. 동작 화면

## 6.1 Storage 업로드

https://github.com/Strongorange/newMirrorController/assets/74127841/da7cb61c-4aa5-453c-8736-24c664037605

## 6.2 스마트 미러에 사진 보여주기

https://github.com/Strongorange/newMirrorController/assets/74127841/1bc3db4a-90aa-4316-9fe9-e76e6cef6462


## 6.3 미세먼지 측정소 변경 

https://github.com/Strongorange/newMirrorController/assets/74127841/cc44d2a2-3136-4028-9de2-ea1535f25136


## 6.4 메세지 추가


https://github.com/Strongorange/newMirrorController/assets/74127841/1d57d9b4-59ae-4f43-a676-51acc4d91741




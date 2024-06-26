<br>
    <H1>돈워리</H1>

</div>
<br>
<br>
<div align="center">
	<h4>✨ Languages ✨</h4>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=javascript&logoColor=white"/>
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=HTML5&logoColor=white"/>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/supabase-0000ff?style=flat-square&logo=supabase&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
 <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Expo-000000?style=flat-square&logo=Expo&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

</div>
<br>
<br>

<div align="center">
<h3>👨🏼‍💻👩🏼‍💻 팀원 소개👨🏼‍💻👩🏼‍💻</h3>

전대현 https://github.com/DHyeonJ <br/>
김우진 https://github.com/rladnwls383<br/>

</div>
<br>
<br>
<div align="center">
<h2>🏅프로젝트 소개</h2>
나와 비슷한 고민을 가지고 있는 사람들에게 나만의 챌린지를 공유하는 챌린지를 도전하는 돈워리를 소개합니다.
</div>
<br>
<br>
<div align="center">
<h2>🏅페이지 소개</h2>
<div>
  <h5> 🎊 메인 페이지: 공감 수가 가장 많은 챌린지가 메인에 랭킹과 현재 내가 도전하고 있는 챌린지 현황을 확인 할 수 있습니다. </h5>
    <img width="600" alt="스크린샷 2024-06-26 오후 10 49 29" src="https://github.com/wjd-dontworry/dontworry-project/assets/53931787/74bb41c3-18ed-4308-a3d2-c05c93effe2c">
     <br>
<br>
 <h5>  🎊챌린지 페이지 : 비슷한 고민을 가지고 있는 사람들이 도전할 수 있는 챌린지들과 내가 챌린지를 새로 등록할 수 있습니다.  </h5>
   <img width="600" alt="스크린샷 2024-06-26 오후 11 04 25" src="https://github.com/wjd-dontworry/dontworry-project/assets/53931787/1e75a29e-d340-4c9f-84ba-4e49d95b1f30">
<br>
<br>

  <h5> 🎊게시판 페이지 : 고민이 있는 사람들이 게시판을 활용해 등록을 하면 나와 비슷한 고민들을 확인 할 수 있습니다. </h5>
   <img width="600" alt="스크린샷 2024-06-26 오후 11 04 32" src="https://github.com/wjd-dontworry/dontworry-project/assets/53931787/a4eb976c-f9c1-4294-9b64-5c0a6f823a92">
  <br>
<br>
 <h5>  🎊마이페이지 : 내가 작성한 챌린지 전체 / 챌린지별 공감 수, 챌린지별 달성률, 회원 정보 수정, 회원 탈퇴 기능을 확인할 수 있습니다. </h5>
 <img width="600" alt="스크린샷 2024-06-26 오후 11 04 38" src="https://github.com/wjd-dontworry/dontworry-project/assets/53931787/2fce6020-b7ef-43fe-9742-bc6116ff149f">
</div>


<br>
<br>

<div align="left"><br><br>

## 프로젝트 브로셔

[Project Browser : 돈워리](https://opalescent-pearl-93b.notion.site/fcda09302000479fbb66d894403d69ec?pvs=4)

## 페이지 구성

- 메인페이지
- 챌린지 페이지
  - 챌린지 등록/수정 페이지
- 게시판 페이지
  - 게시판 등록/수정 페이지
- 회원가입
- 회원정보 수정
- 로그인
- 마이페이지

## 깃 플로우 전략

- `main`
- `dev`
- `feat`
  - header
  - footer
  - ListPage
  - myPage

1. 본인 기능 구현한 브랜치 push 하기 → `git push origin feat/comments`
2. 본인 기능 구현한 브랜치에 dev 브랜치 pull 받기 → `git pull origin dev`
3. 충돌 있으면 해결 후 본인 브랜치에 push 함 → `git push origin feat/comments`
4. 본인 브랜치에서 dev로 PR 날림
5. PR 리뷰 후, 1명 이상 승인 시 merge 버튼 활성화

## 커밋 컨벤션

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Chore: 설정 변경 등 기타 변경사항
- Design: HTML, CSS 등 사용자 UI 디자인 변경
- Resolve: 충돌 해결
- Refactoring: 코드 리팩토링

## 코드 컨벤션

#### 컴포넌트 파일명은 _파스칼 케이스_ 로 작성합니다.

```tsx
Companion.tsx
```

#### 컴포넌트를 제외한 폴더, 파일명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 폴더명
api
components

// 파일명 (컴포넌트 이외)
configStore.ts
index.ts
```

#### 함수명, 변수명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 함수명
const findCompanion = () => {}

// 변수명
const [name, setName] = useState("")
let joinedCompanion = [john, karina]
```

#### 클래스명은 _케밥 케이스_ 로 작성합니다.

```tsx
<h1 class="main-title">동행 구함</h1>
```

#### Styled-Components를 적용한 html 태그명은 아래와 같이 작성합니다.

- 스타일 파일 import

```tsx
import * as St from ‘./경로'
```

- 각 html 태그명

```tsx
view: '컴포넌트명' Box
touchableOpacity : '컴포넌트명'Button
text : '컴포넌트명' Text
icon : '컴포넌트명' Icon

```

#### 스타일 코드의 순서는 아래와 같이 작성합니다.

```ts
.sample {
  /* position 관련 */
  position: absolute;
  top: 0;
  left: 0;

  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  /* size 관련 */
  width: auto;
  height: auto;

  /* margin, padding */
  margin: 0 auto;
  padding: 12px;

  /* background 관련 */
  background-color: #ffffff;

  /* border 관련 */
  border: 1px solid #ffffff;
  border-radius: 12px;

  /* font 관련 */
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  /* animation 관련 */
  transform: translate(10px, 100%);
  transition: 300ms;
}
```

## 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```ts
MainComponent.jsx
Route.jsx
```

컴포넌트를 제외한 폴더, 파일명은 카멜 케이스(camelCase)를 사용한다.

```ts
components
modules
configStore.js
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```ts
function nameOfFunction() {
  // ...some logic
}
```

### 변수명

상수는 모두 대문자로 쓰며 띄어쓰기는 \_로 처리하며, 객체타입의 경우 카멜 케이스를 적용한다.

```ts
const SOME_VALUE = 1

const people = {
  name: "김자바",
  age: "26",
}
```

### 클래스명

클래스명은 케밥 케이스(kebab-case)를 원칙으로 한다.

```html
<h1 class="main-title">오늘 메뉴 추천</h1>
```

</div>

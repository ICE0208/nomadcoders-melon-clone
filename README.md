# <span id="top">☁️ Goorm Music 🎵</span>

<br>

<div align="center">
 <div> <a href="https://goormmusic.kro.kr/"><img src="https://user-images.githubusercontent.com/46257328/233306370-7d051c4c-2379-48e0-8f4f-41a338b55de9.png" width="300"></a></div>
 <br>
 <div><a href="https://goormmusic.kro.kr/" target="_blank">🔗 프로젝트 배포 URL</a></div>
  
</div>

<br/>

## <span>프로젝트 소개</span>

### [ 개요 ]

- Goorm Music은 특정 음악을 들을 수 있는 웹 페이지입니다.
- 사이트에 있는 음악의 조회수 순위를 확인할 수 있습니다.
- 구글 계정으로 로그인하고 찜하기를 이용하여 나만의 플레이리스트를 만들 수 있습니다.
- 플레이리스트는 한 사이클 재생, 전체 반복 재생, 한 곡 반복 재생의 기능을 제공합니다.
- 다양하고 재밌는 애니메이션 효과가 제공됩니다.

<br>

### [ 제작 목적 ]

- 노마드 클론코딩 컨테스트 참여
- Pug, Scss, Express, MongoDB 등 배웠던 웹 기술 복습

<br>

### [ 제작 기간 ]

(2023.03.31 - 2023.04.21)

### 2023 April

| SUN     | MON     | TUE     | WED     | TUR     | FRI     | SAT     |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
|         |         |         |         |         | 31 🔨   | 1 🎧    |
| 2 🎧    | 3 🎧    | 4 🎧    | 5 📊    | 6 📊    | 7 📊    | 8 📊    |
| 9 📊    | 10 📊   | 11 📦   | 12 📦   | 13 📦🎨 | 14 📦🎨 | 15 📦🎨 |
| 16 📦🎨 | 17 📦🎨 | 18 🎨🛠️ | 19 🎨🛠️ | 20 🛠️   | 21 🛠️✅ | 22      |
| 23      | 24      | 25      | 26      | 27      | 28      | 29      |
| 30      |         |         |         |         |         |         |

- 🔨 : 개발 환경 세팅
- 🎧 : 뮤직 플레이어 구현
- 📊 : 인기 차트 구현
- 📦 : 플레이리스트 구현
- 🎨 : 스타일 작업
- 🛠️ : README 작성 및 배포
- ✅ : 제출

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

## <span>📍 목차 </span>

[@ 개발 기술](#development)<br>
[@ 주요 기능](#main-feature)<br>
[@ 구현 기능 사진](#feature-img)<br>
[@ 프로젝트 구조](#structure)<br>
[@ 실행 및 배포](#run-deploy)<br>

<br>

## <span id="development">⚙️ 개발 기술</span>

### [ Front End ]

<img src="https://img.shields.io/badge/PUG-A86454?style=for-the-badge&logo=PUG&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-efd81d?style=for-the-badge&logo=Javascript&logoColor=white"/>

### [ Back End ]

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/Mongo DB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

### [ Tools ]

<img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Git-e84d31?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/VScode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

## <span id="main-feature">🛠 주요 기능</span>

### ⭐️ 뮤직 플레이어

- 차트 혹은 플레이 리스트에서 선택한 음악을 재생할 수 있습니다.
- input 태그를 이용하여 재생 시간 위치와 볼륨을 조절할 수 있습니다.
- [재생/정지하기, 다음 곡/이전 곡으로 건너 뛰기, 찜하기, 한 사이클/전체 반복/한 곡 반복 재생] 의 기능이 제공됩니다.
- 찜하기를 누르면 현재 사용자의 찜하기 목록 데이터 베이스가 변경됩니다.

### ⭐️ 인기곡 차트

- 데이터 베이스에 있는 노래를 불러와 조회 수 순으로 차트에 나열합니다.
- 노래 이미지, 제목, 아티스트, 조회수의 정보가 표시됩니다.

### ⭐️ 플레이 리스트

- 현재 사용자의 찜하기 목록 데이터 베이스에 있는 노래를 불러와 나열합니다.
- 플레이 리스트 기본 순서는 추가된 순 이며, 순서는 사용자가 자유롭게 변경할 수 있습니다.

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

## <span id="feature-img">🏞️ 구현 기능 사진</span>

| <center>재생 / 정지</center>                                                                                            | <center>재생 시간 조절</center>                                                                                         | <center>볼륨 조절</center>                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/46257328/233035397-1e9bbd8e-ae9a-4590-9c22-c2524205b64a.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035392-3172bc14-5d93-4529-a569-f0f9b1e2beea.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035388-913b563a-294c-41f1-abc4-c67cdb319e71.gif"></img> |

| <center>찜하기</center>                                                                                                 | <center>다음곡 재생 및 반복 기능</center>                                                                               | <center>차트 보이기 / 숨기기</center>                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/46257328/233035399-0cfbf331-9df2-4a93-a4e9-8fdc8a1a8fe1.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035316-a7aa44d2-a3b6-4f61-9272-7606e649e4d1.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035410-94871a93-76a5-4639-bd82-d21f413387c1.gif"></img> |

| <center>플레이리스트 보이기 / 숨기기</center>                                                                           | <center>플레이리스트 순서변경</center>                                                                    | <center>플레이리스트 자유로운 이동</center>                                                                             |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/46257328/233035420-a1fb6e4d-c05f-4d5e-accb-bc39fef79459.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035416-7fa401bd-4a8c-461d-bf6c-d0dc733ca03c.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035428-43efdeeb-3b80-4b55-be80-4d62325c4e9b.gif"></img> |

| <center>차트에서 곡 선택</center>                                                                                       | <center>플레이리스트에서 곡 선택</center>                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/46257328/233035440-3fbabfec-690d-4b97-844c-f777226fcf79.gif"></img> | <img src="https://user-images.githubusercontent.com/46257328/233035453-ec4ba8c2-43b0-4876-990d-018acb2724f4.gif"></img> |

| <center>전체 사진</center>                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/46257328/233040663-741deb9c-dd26-41b8-a2b9-b69fcf080062.png"></img> |

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

## <span id="structure">프로젝트 구조</span>

```
📦src
 ┣ 📂client
 ┃ ┣ 📂img
 ┃ ┃ ┗ 📜favicon.ico
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜music-chart.js
 ┃ ┃ ┣ 📜music-like.js
 ┃ ┃ ┣ 📜music-player.js
 ┃ ┃ ┣ 📜music-playlist.js
 ┃ ┃ ┣ 📜music-repeat.js
 ┃ ┃ ┣ 📜musicController.js
 ┃ ┃ ┣ 📜musicSelectAnimation.js
 ┃ ┃ ┗ 📜play-next.js
 ┃ ┗ 📂scss
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜header.scss
 ┃ ┃ ┃ ┣ 📜music-chart.scss
 ┃ ┃ ┃ ┣ 📜music-player.scss
 ┃ ┃ ┃ ┗ 📜music-playlist.scss
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ 📜_mixins.scss
 ┃ ┃ ┃ ┣ 📜_reset.scss
 ┃ ┃ ┃ ┗ 📜_variables.scss
 ┃ ┃ ┗ 📜styles.scss
 ┣ 📂controllers
 ┃ ┣ 📜songController.js
 ┃ ┗ 📜userController.js
 ┣ 📂models
 ┃ ┣ 📜Song.js
 ┃ ┗ 📜User.js
 ┣ 📂routers
 ┃ ┣ 📜apiRouter.js
 ┃ ┣ 📜authRouter.js
 ┃ ┗ 📜rootRouter.js
 ┣ 📂views
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜music-chart.pug
 ┃ ┃ ┣ 📜music-player.pug
 ┃ ┃ ┗ 📜music-playlist.pug
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜base.pug
 ┃ ┣ 📂mixins
 ┃ ┃ ┗ 📜music.pug
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜home.pug
 ┃ ┗ 📂partials
 ┃ ┃ ┗ 📜header.pug
 ┣ 📜db.js
 ┣ 📜init.js
 ┣ 📜middlewares.js
 ┗ 📜server.js
```

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

## <span id="run-deploy">🛠 실행 및 배포</span>

### 실행하기

- 이 폴더를 `VSCode`에서 열기
- `터미널` -> `새 터미널`을 선택
- `npm i` 실행
- 이 폴더에 `.env` 파일 생성
- .env 파일에 아래의 5가지 `환경 변수`를 작성

  ```dosini
    DB_URL = yourMongoDbUrl
    COOKIE_SECRET = yourCookieSecret
    G_CLIENT_ID = yourGoogleClientId
    G_CLIENT_SECRET = yourGoogleClientSecret
    G_CALLBACK_URL = YourGoogleAuthCallbackUrl
  ```

- `npm run dev:assets` 실행.
- `터미널` -> `분할 터미널` 선택하여 새로운 터미널 열기
- 새로운 터미널에서 `npm run dev:server` 실행

### 배포하기

- `npm run build` 실행
- `npm start` 실행

<p align="right"><a href="#top">⬆️Top</a></p>

---

<br>

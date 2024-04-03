# :house_with_garden: 내돈내산 - 인프라 기반 동네 추천 웹 사이트


## :link: 내돈내산 링크(웹 화면): [내돈내산 :house: 으로 이동](https://j10e204.p.ssafy.io/)
## :cinema: 소개 영상 보기: [UCC ]()|[ 시연영상]()
## 소개 PPT: [내돈내산 PPT]()

## :date: 프로젝트 진행 기간
**2024.02.19(월) ~ 2024.04.04(목)**: 6weeks

SSAFY 10기 2학기 특화 프로젝트 - 내돈내산 :house:


## :cherry_blossom: 내돈내산 기획 배경

## :fish_cake: 내돈내산 기능

## :hammer: 개발 환경 및 기술 스택
### FE
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"><br>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">

### BE
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"><br>
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"><br>
<img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white"><br>
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongoDB&logoColor=white">
<img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white"><br>
<img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink">
<img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white">

### INFRA
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"><br>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">

<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">

### 버전/이슈 관리
<img src="https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white"> <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">


### 협업
<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white"> <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">


## :bar_chart: 아키텍처 구조

## :file_folder: 프로젝트 파일 구조

<details>
<summary><b>FE</b></summary>
<pre>
<code>
Front
 ┣ public
 ┃ ┣ mango.png
 ┃ ┣ redhouse.png
 ┃ ┗ vite.svg
 ┣ src
 ┃ ┣ assets
 ┃ ┃ ┣ appleMango.png
 ┃ ┃ ┣ bluehouse.png
 ┃ ┃ ┣ building.png
 ┃ ┃ ┣ buildingCarousel.png
 ┃ ┃ ┣ camparison.png
 ┃ ┃ ┣ company.gif
 ┃ ┃ ┣ comparisonCarousel.png
 ┃ ┃ ┣ dong.gif
 ┃ ┃ ┣ garma.jpg
 ┃ ┃ ┣ hamburger.png
 ┃ ┃ ┣ house.png
 ┃ ┃ ┣ information.png
 ┃ ┃ ┣ informationCarousel.png
 ┃ ┃ ┣ like.png
 ┃ ┃ ┣ logo.png
 ┃ ┃ ┣ marker.png
 ┃ ┃ ┣ mypage.png
 ┃ ┃ ┣ mypageCarousel.png
 ┃ ┃ ┣ news.jpg
 ┃ ┃ ┣ recommend.png
 ┃ ┃ ┣ recommendCarousel.png
 ┃ ┃ ┣ redhouse.png
 ┃ ┃ ┣ tooltip.png
 ┃ ┃ ┗ unlike.png
 ┃ ┣ components
 ┃ ┃ ┣ building
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┗ BuildingCard.tsx
 ┃ ┃ ┃ ┣ content.css
 ┃ ┃ ┃ ┣ KakaoMap.tsx
 ┃ ┃ ┃ ┗ SideBuilding.tsx
 ┃ ┃ ┣ comparison
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┗ Card.tsx
 ┃ ┃ ┃ ┣ Column.tsx
 ┃ ┃ ┃ ┣ ComparisonGraph.tsx
 ┃ ┃ ┃ ┣ DetailGraph.tsx
 ┃ ┃ ┃ ┣ DongAdd.tsx
 ┃ ┃ ┃ ┗ tenor.gif
 ┃ ┃ ┣ entry
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┣ Card.tsx
 ┃ ┃ ┃ ┃ ┗ Carousel.tsx
 ┃ ┃ ┃ ┣ KakaoLogin.tsx
 ┃ ┃ ┃ ┗ SideButton.tsx
 ┃ ┃ ┣ information
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┗ NewsCard.tsx
 ┃ ┃ ┃ ┣ RadarChart.tsx
 ┃ ┃ ┃ ┣ Report.tsx
 ┃ ┃ ┃ ┣ ReportNews.tsx
 ┃ ┃ ┃ ┣ SideNews.tsx
 ┃ ┃ ┃ ┣ TableChart.tsx
 ┃ ┃ ┃ ┗ TextBox.tsx
 ┃ ┃ ┣ my
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┗ LikedDong.tsx
 ┃ ┃ ┃ ┣ Like.tsx
 ┃ ┃ ┃ ┣ Report.tsx
 ┃ ┃ ┃ ┣ ReportContent.tsx
 ┃ ┃ ┃ ┗ test.tsx
 ┃ ┃ ┗ recommend
 ┃ ┃ ┃ ┣ reuse
 ┃ ┃ ┃ ┃ ┣ InfraSlider.tsx
 ┃ ┃ ┃ ┃ ┗ SelectCard.tsx
 ┃ ┃ ┃ ┣ KakaoMap.tsx
 ┃ ┃ ┃ ┣ SelectInfra.tsx
 ┃ ┃ ┃ ┗ SideRecommend.tsx
 ┃ ┣ datas
 ┃ ┃ ┣ buildings.json
 ┃ ┃ ┣ dong.json
 ┃ ┃ ┣ dongName.json
 ┃ ┃ ┣ jm.json
 ┃ ┃ ┣ ms.tsx
 ┃ ┃ ┣ newDong.json
 ┃ ┃ ┣ newGu.json
 ┃ ┃ ┣ newsImages.json
 ┃ ┃ ┣ SB.json
 ┃ ┃ ┗ test.json
 ┃ ┣ pages
 ┃ ┃ ┣ BuildingPage.tsx
 ┃ ┃ ┣ ComparisonPage.tsx
 ┃ ┃ ┣ EntryPage.tsx
 ┃ ┃ ┣ InformationPage.tsx
 ┃ ┃ ┣ InitialFormPage.tsx
 ┃ ┃ ┣ MyPage.tsx
 ┃ ┃ ┗ RecommendPage.tsx
 ┃ ┣ stores
 ┃ ┃ ┣ DongStore.tsx
 ┃ ┃ ┣ SearchStore.tsx
 ┃ ┃ ┣ store.tsx
 ┃ ┃ ┣ UseLikeStore.tsx
 ┃ ┃ ┗ UserStore.tsx
 ┃ ┣ utils
 ┃ ┃ ┣ Alert.tsx
 ┃ ┃ ┣ NavBar.tsx
 ┃ ┃ ┣ RecommendList.tsx
 ┃ ┃ ┣ SearchBar.tsx
 ┃ ┃ ┣ Tooltip.tsx
 ┃ ┃ ┣ UseAxios.tsx
 ┃ ┃ ┗ UserForm.tsx
 ┃ ┣ App.tsx
 ┃ ┣ AppRoutes.tsx
 ┃ ┣ index.css
 ┃ ┣ main.tsx
 ┃ ┣ twin.d.ts
 ┃ ┗ vite-env.d.ts
 ┣ .eslintrc.cjs
 ┣ .gitignore
 ┣ index.html
 ┣ package-lock.json
 ┣ package.json
 ┣ postcss.config.js
 ┣ README.md
 ┣ tailwind.config.js
 ┣ tsconfig.json
 ┣ tsconfig.node.json
 ┗ vite.config.ts
</code>
</pre>
</details>


<details>
<summary><b>BE</b></summary>
<pre>
<code>
Back
 ┣ gradle
 ┃ ┗ wrapper
 ┃ ┃ ┣ gradle-wrapper.jar
 ┃ ┃ ┗ gradle-wrapper.properties
 ┣ specializePJ
 ┃ ┣ src
 ┃ ┃ ┗ Main.java
 ┃ ┗ .gitignore
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ back
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ AuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TokenService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ JwtAuthorizationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ JwtProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ JwtToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ OAuthDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TokenType.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ oauth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ OAuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ FanPrincipalDetailsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ KakaoProfile.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ OAuthToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PrincipalDetails.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ redis
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ RedisService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ FormDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ building
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ BuildingController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BuildingDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BuildingIdRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BuildingPageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ BuildingXYDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Building.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ BuildingRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ BuildingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BaseEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ErrorMessage.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ HttpStatusEnum.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Message.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ CorsConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RedisRepositoryConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ dashboard
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DashboardController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ document
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Article.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ArticleDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ArticlePageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ AvgInfraDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ArticleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DashboardService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ dong
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DongController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DongInfraResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Dong.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DongRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ DongService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ AlreadyZzimedException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BuildingNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ DongNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ GlobalControllerExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ImageUploadException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RefreshTokenIncorrectException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ UserNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ZzimNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ gu
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GuController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Gu.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ infra
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Infra.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ infracount
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ InfraCountSummaryDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ InfraTypeAvgCountDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraTypeCountDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraCount.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraCountRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ infrascore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ InfraAvgScoreDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraScoreDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraScore.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraScoreRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ infratype
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ InfraType.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ keyword
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ KeywordController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ document
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Keyword.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ KeywordDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ KeywordRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ KeywordService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ report
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MypageDongDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MypageFilterDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RecommendationDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ReportDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Report.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ reportdong
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportDongController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportDong.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ReportdongRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ subway
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ SubwayDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Subway.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ SubwayRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ AddressDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Coordinate.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ LatLonDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MypageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserSimple.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Gender.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ User.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ zzim
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ZzimController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ZzimDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ZzimRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Zzim.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ZzimRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ZzimService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ BackApplication.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┣ application-oauth.yml
 ┃ ┃ ┃ ┗ application.yml
 ┃ ┗ test
 ┃ ┃ ┗ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ back
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ DemoApplicationTests.java
 ┣ .gitignore
 ┣ build.gradle
 ┣ Dockerfile
 ┣ gradlew
 ┣ gradlew.bat
 ┗ settings.gradle
 </code>
 </pre>
</details>


<details>
<summary><b>ML</b></summary>
<pre>
<code>
</code>
</pre>
</details>


## :sparkler: 내돈내산 주요 기능

## :memo: 프로젝트 산출물
- [프로토타입](https://www.figma.com/file/bBPcUcmCZg5fgGhJ1OfW6r/%EB%82%B4%EB%8F%88%EB%82%B4%EC%82%B0?type=design&node-id=0-1&mode=design&t=Usom68rZGy5AMPmq-0)
- [요구사항 명세서](https://www.notion.so/f9f680e00c9a4bb384ed23b73671370d)
- [API 명세서](https://www.notion.so/API-5ee34edf880f426bb3e901878e650d00)
- [ERD](https://www.notion.so/DB-ERD-a3b7e487c42c4cf8a5835055831efa82)
- [포팅 매뉴얼]()

## :bulb: 개발 문화


## :family: 팀원 소개

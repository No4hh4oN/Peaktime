# 2025 PEAK;TIME — 삼육대학교 천보축전 웹서비스

<div align="center">
  <img src="/public/images/Insta.png" width="600" alt="축제 홍보 인스타 이미지" />
  
> 삼육대학교 2025 천보축전 공식 웹페이지<br/>
> React 기반 반응형 PC·모바일 웹서비스입니다.
</div>


---

## 프로젝트 개요

| 항목        | 내용                                                               |
| --------- | ---------------------------------------------------------------- |
| **프로젝트명** | 2025 PEAK;TIME (삼육대학교 천보축전)                                      |
| **기간**    | 2025.08 ~ 2025.10                                                |
| **형태**    | 반응형 웹 서비스 (PC / Mobile)                                          |
| **배포 주소** | [https://www.syu-festival.site/](https://www.syu-festival.site/) |
| **목표**    | 학생 및 방문객에게 축제 정보, 공연, 부스, 공지 등 통합 정보 제공                          |

---

## 팀 구성

<div align="center">

| <img src="https://avatars.githubusercontent.com/No4hh4oN" width="200" height="200" style="border-radius:50%"/><br/>[장준익](https://github.com/No4hh4oN)<br/><sub>Frontend</sub> | <img src="https://avatars.githubusercontent.com/heeyoung00" width="200" height="200" style="border-radius:50%"/><br/>[심희영](https://github.com/heeyoung00)<br/><sub>Frontend</sub> | <img src="https://avatars.githubusercontent.com/GyoseungKu" width="200" height="200" style="border-radius:50%"/><br/>[구교승](https://github.com/GyoseungKu)<br/><sub>Backend</sub> | <img src="https://placehold.co/80x80?text=NH" width="200" height="200" style="border-radius:50%"/><br/>임나현<br/><sub>Design</sub> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |

</div>

---

## 주요 기능

| 구분             | 기능                                          |
| -------------- | ------------------------------------------- |
| **인증**         | 로그인 / 회원가입 / 이메일 인증 / 비밀번호 재설정              |
| **홈**          | PURPOSE & HISTORY, 스폰서 소개                   |
| **타임테이블**      | 공연 일정 및 시간별 정보 확인                           |
| **라인업**        | 공연 참여 아티스트 목록                               |
| **공지사항 & FAQ** | 공지, 문의, 자주 묻는 질문                            |
| **지도(Map)**    | SVG 기반 캠퍼스 지도 + 확대/이동(react-zoom-pan-pinch) |
| **무대(Stage)**  | 사연 라디오 참여 기능                                |
| **마이페이지**      | 회원 정보, 도장판(참여 인증)                           |

---

## 기술 스택

| 구분           | 사용 기술                                                                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40"/> React    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40"/> JavaScript |
| **Backend**  | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" width="40" height="40"/> Spring Boot    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="40" height="40"/> MySQL        |
| **Design**   | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="40" height="40"/> Figma                                                                                                                                         |
| **Deploy**   | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="40" height="40"/> Vercel                                                                                                                                      |

---

## 핵심 구현 포인트

* **SVG 기반 캠퍼스 지도 구현**
  `react-zoom-pan-pinch`로 확대·이동 지원
  `Campusmap.svg?react` 로드 후 React Component로 제어

* **반응형 레이아웃 구성**
  PC / Mobile 뷰 기준 분기 처리
  CSS 미디어쿼리 기반 직접 구현

* **Axios 인터셉터 적용**
  JWT 토큰 관리 및 에러 핸들링 구조화

* **페이지별 폴더 분리**
  home, map, notice, stage, mypage 등 단위별 라우팅 구성

* **로딩 인터랙션**
  공연·라디오 섹션 로딩 시 애니메이션 효과 구현

---

## 디렉토리 구조

```bash
FESTA2025/
├── peaktime/
│   ├── .vercel/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── api/               # Axios 인스턴스 및 API 모듈
│       ├── assets/            # 이미지, SVG, 정적 파일
│       ├── components/        # 공통 컴포넌트
│       ├── home/              # 홈 페이지
│       ├── mainpage/          # 메인/타임테이블
│       ├── map/               # 지도 (react-zoom-pan-pinch 적용)
│       ├── mypage/            # 마이페이지 및 도장판
│       ├── notice/            # 공지 및 FAQ
│       ├── stage/             # 무대(사연라디오)
│       ├── AxiosClinet.js     # Axios 설정 파일
│       └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 시연 영상

[YouTube 보기](https://www.youtube.com/watch?v=UCfE8hISmPw)

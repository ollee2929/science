# science

수업용 과학 시뮬레이터 모음입니다. [Vite](https://vite.dev) 기반의 순수 HTML/CSS/JavaScript 프로젝트입니다.

## 시작하기

필요: [Node.js](https://nodejs.org) 22 이상 (`.nvmrc` 참고)

```bash
npm install      # 의존성 설치 (최초 1회)
npm run dev      # 개발 서버 실행 → http://localhost:5173
```

개발 서버가 켜져 있으면 파일을 저장할 때마다 브라우저가 자동으로 새로고침됩니다.

## 주요 명령어

| 명령어            | 설명                                          |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | 개발 서버 실행                                |
| `npm run build`   | 배포용 파일을 `dist/` 폴더에 생성             |
| `npm run preview` | 빌드 결과물을 로컬에서 미리 보기              |
| `npm test`        | 테스트 실행 (`npm run test:watch`: 감시 모드) |
| `npm run lint`    | ESLint로 코드 오류 검사                       |
| `npm run format`  | Prettier로 코드 자동 정리                     |
| `npm run check`   | 린트 + 포맷 검사 + 테스트 + 빌드 한 번에 실행 |

## 폴더 구조

```
index.html               첫 화면 (시뮬레이터 목록)
climate/index.html       한반도 기후변화 히트맵 시뮬레이터
homeostasis/index.html   항상성 조절 모식도 시뮬레이터
src/
  home.css               첫 화면 스타일
  climate/               기후변화 앱의 동작(main.js)·계산(climate.js)·스타일
  homeostasis/           항상성 앱의 동작(main.js)·스타일
tests/
  climate.test.js        계산 로직 테스트 (Vitest)
.github/workflows/
  ci.yml                 PR·브랜치 푸시 시 자동 검사
  deploy.yml             main 브랜치 푸시 시 GitHub Pages 자동 배포
```

## 새 시뮬레이터 추가하기

1. `새이름/index.html` 페이지와 `src/새이름/` 폴더를 만듭니다.
2. `vite.config.js`의 `input`에 한 줄 추가합니다.
3. 첫 화면 `index.html`의 목록에 링크를 추가합니다.

## 배포 (GitHub Pages)

1. GitHub 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정합니다.
2. `main` 브랜치에 푸시(또는 PR 병합)하면 자동으로 검사 후 배포됩니다.
3. 주소: `https://<GitHub 사용자명>.github.io/science/`

## 개발 도구

VS Code를 쓴다면 저장소를 열 때 추천 확장(ESLint, Prettier, EditorConfig)을 설치하세요. 저장 시 자동으로 코드가 정리됩니다.

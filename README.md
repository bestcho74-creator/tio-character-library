# 교사크리에이터협회 캐릭터 레퍼 for AI

TIO 고정 원형·프롬프트·표정/포즈·소셜미디어 활용 샘플을 제공하는 정적 웹앱입니다.

- 고정 원형 관리 ID: TIO-MASTER-20261018-001
- 고정 원형의 실제 Higgsfield 생성 ID: fb354839-756c-4a37-83f7-d325f969a9dc
- 원본 생성 시드: 메타데이터와 작업 기록에 미제공.
- 작업용 고정 시드: 160944995 (원형 파일 SHA-256에서 정한 별도 프로젝트 설정값). 원본 생성 시드를 복구한 값이 아니며, 시드 지원 모델에서만 사용합니다.
- Higgsfield 캐릭터 Reference ID: b6aab7dd-62dd-4b40-84a9-3503571a6437. 등록 계정의 지원 모델에서 사용하며, 다른 AI에서는 원형 PNG를 직접 첨부하세요.
- QR 연결: https://t-creator.com
- HTML/CSS/JavaScript를 main 브랜치에 반영하면 GitHub Pages가 자동 재배포합니다.
- 원형과 생성 작업 ID, 별도 파생 이미지의 관리 ID는 서로 구분합니다. 시드만으로 다른 AI에서 외형을 보장할 수 없습니다.

## 로컬 확인
`python3 -m http.server 4173` 실행 후 http://localhost:4173 에서 확인합니다.

## 수정
화면은 index.html/styles.css/app.js, 모션은 motion.js, 이미지 목록과 실제 기록은 catalog.js, 프롬프트는 prompts.js에서 관리합니다. assets/에 파일을 추가하고 상대 경로로 연결하세요.

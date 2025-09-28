# OKRoute

분기별 프로젝트 관리 및 학습 진도 관리 툴

## 주요 기능

- 프로젝트 관리

## 기술 스택

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
  - 접근성이 준수된 UI 컴포넌트
  - Radix UI 기반
  - 테마 커스터마이징 지원

### Authentication

- 소셜 로그인 (카카오, 네이버, 깃허브)

### Database

- Lucid
  - Schema
  - Types
  - Validators

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/
│   │   ├── auth/
│   │   │   └── callback/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── learning/
│   │   ├── okr/
│   │   ├── planner/
│   │   ├── reflection/
│   │   └── todo/
│   └── layout.tsx
├── components/
│   ├── common/
│   ├── learning/
│   ├── okr/
│   └── todo/
└── lib/
    └── utils.ts
```

## 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build
```

## 환경 변수 설정

```env
# .env.local
NEXT_PUBLIC_KAKAO_CLIENT_ID=
NEXT_PUBLIC_KAKAO_REDIRECT_URI=
NEXT_PUBLIC_NAVER_CLIENT_ID=
NEXT_PUBLIC_NAVER_REDIRECT_URI=
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXT_PUBLIC_GITHUB_REDIRECT_URI=
```

## 라이선스

MIT License

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 staleTime 설정 - 30초
            staleTime: 1000 * 30,
            // 기본 캐시 유지 시간 - 5분
            gcTime: 1000 * 60 * 5,
            // 에러 발생시 재시도 3번
            retry: 3,
            // 네트워크/서버 에러시 자동 재시도
            retryDelay: attemptIndex =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // 뮤테이션 실패시 재시도 없음
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

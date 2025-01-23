'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    console.log({ token });

    if (token) {
      // 액세스 토큰을 로컬 스토리지나 상태 관리 도구에 저장
      localStorage.setItem('access_token', token);

      // 로그인 완료 후 메인 페이지나 원하는 페이지로 리다이렉트
      router.push('/');
    }
  }, [searchParams, router]);

  return <div>로그인 처리중...</div>;
};

export default KakaoCallback;

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    // 에러 처리 추가
    if (error) {
      console.error('로그인 에러:', error);
      router.push('/login?error=' + error);
      return;
    }

    if (token) {
      try {
        // 토큰 유효성 검증 (선택사항)
        if (!isValidToken(token)) {
          throw new Error('유효하지 않은 토큰입니다.');
        }

        // 토큰 저장
        localStorage.setItem('access_token', token);

        // 사용자 정보 가져오기 (선택사항)
        fetchUserInfo(token);

        // 리다이렉트
        router.push('/');
      } catch (err) {
        console.error('토큰 처리 에러:', err);
        router.push('/login?error=token_error');
      }
    } else {
      router.push('/login?error=no_token');
    }
  }, [searchParams, router]);

  // 토큰 유효성 검증 함수
  const isValidToken = (token: string): boolean => {
    // JWT 토큰 형식 검증 등
    return token.split('.').length === 3;
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('/auth/callback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        localStorage.setItem('user_info', JSON.stringify(userInfo));
      }
    } catch (err) {
      console.error('사용자 정보 조회 실패:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">로그인 처리중...</p>
      </div>
    </div>
  );
};

export default KakaoCallback;

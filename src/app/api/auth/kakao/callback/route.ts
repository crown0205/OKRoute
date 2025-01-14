import { NextResponse } from 'next/server';
import axios from 'axios';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

interface KakaoUserData {
  id: number;
  properties: {
    nickname: string;
    profile_image?: string;
  };
  kakao_account: {
    email?: string;
    profile?: {
      nickname: string;
      profile_image_url?: string;
    };
  };
}

async function getKakaoToken(code: string): Promise<KakaoTokenResponse> {
  const { data } = await axios.post(
    KAKAO_TOKEN_URL,
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      code,
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return data;
}

async function getKakaoUserInfo(accessToken: string): Promise<KakaoUserData> {
  const { data } = await axios.get(KAKAO_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export async function GET(request: Request) {
  try {
    const code = new URL(request.url).searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: '인증 코드가 없습니다.' },
        { status: 400 },
      );
    }

    const tokenData = await getKakaoToken(code);
    const userData = await getKakaoUserInfo(tokenData.access_token);

    // TODO: 사용자 정보를 DB에 저장하거나 세션/쿠키를 설정하는 로직 추가
    console.log({ userData });
    console.log({ tokenData });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('카카오 로그인 에러:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : '로그인 처리 중 오류가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

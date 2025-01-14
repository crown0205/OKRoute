import { NextResponse } from 'next/server';
import axios from 'axios';

const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USER_INFO_URL = 'https://openapi.naver.com/v1/nid/me';

interface NaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface NaverUserData {
  response: {
    id: string;
    email: string;
    name: string;
    nickname?: string;
    profile_image?: string;
  };
}

async function getNaverToken(
  code: string,
  state: string,
): Promise<NaverTokenResponse> {
  const { data } = await axios.get(NAVER_TOKEN_URL, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      client_secret: process.env.NAVER_CLIENT_SECRET,
      code,
      state,
    },
  });
  return data;
}

async function getNaverUserInfo(accessToken: string): Promise<NaverUserData> {
  const { data } = await axios.get(NAVER_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      return NextResponse.json(
        { error: '인증 정보가 없습니다.' },
        { status: 400 },
      );
    }

    const tokenData = await getNaverToken(code, state);
    const userData = await getNaverUserInfo(tokenData.access_token);

    // TODO: 사용자 정보를 DB에 저장하거나 세션/쿠키를 설정하는 로직 추가
    console.log({ userData });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('네이버 로그인 에러:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

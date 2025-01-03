import { NextResponse } from 'next/server';
import axios from 'axios';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_INFO_URL = 'https://api.github.com/user';

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubUserData {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

async function getGithubToken(code: string): Promise<GithubTokenResponse> {
  const { data } = await axios.post(
    GITHUB_TOKEN_URL,
    {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  return data;
}

async function getGithubUserInfo(accessToken: string): Promise<GithubUserData> {
  const { data } = await axios.get(GITHUB_USER_INFO_URL, {
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

    const tokenData = await getGithubToken(code);
    const userData = await getGithubUserInfo(tokenData.access_token);

    // TODO: 사용자 정보를 DB에 저장하거나 세션/쿠키를 설정하는 로직 추가
    console.log({ userData });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('깃허브 로그인 에러:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

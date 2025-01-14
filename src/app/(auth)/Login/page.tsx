'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthFormInputs {
  email: string;
  password: string;
  passwordConfirm?: string;
}

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: AuthFormInputs) => {
    if (isLogin) {
      console.log('로그인 시도:', data);
    } else {
      console.log('회원가입 시도:', data);
    }
  };

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleNaverLogin = () => {
    const state = Math.random().toString(36).substr(2, 11);
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${state}`;
    window.location.href = NAVER_AUTH_URL;
  };

  const handleGithubLogin = () => {
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user`;
    window.location.href = GITHUB_AUTH_URL;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-gray-50 rounded-lg shadow-md flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isLogin ? '620px' : '670px',
        }}
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <svg
              className="w-12 h-12 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">OKRoute</h1>
          <p className="mt-2 text-sm text-gray-600">
            서비스를 이용하시려면 로그인해주세요
          </p>
        </div>

        <div className="flex justify-around space-x-4 bg-gray-50 rounded-full relative border border-gray-300">
          <div
            className="absolute top-1/2 h-[80%] w-[48%] bg-orange-500 rounded-full transition-transform duration-300 ease-in-out -translate-y-1/2"
            style={{
              transform: `translate(${isLogin ? '-50%' : '50%'}, -50%)`,
            }}
          />
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-6 py-3 text-base font-medium rounded-full transition-all relative z-10 ${
              isLogin ? 'text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-6 py-3 text-base font-medium rounded-full transition-all relative z-10 ${
              !isLogin ? 'text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form
          className="mt-6 sm:mt-8 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="rounded-md shadow-sm space-y-3 sm:space-y-4">
            <div>
              <input
                id="email"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '유효한 이메일 주소를 입력해주세요',
                  },
                })}
                type="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="이메일"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                id="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다',
                  },
                })}
                type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="비밀번호"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <input
                  id="passwordConfirm"
                  {...register('passwordConfirm', {
                    required: '비밀번호 확인을 입력해주세요',
                    validate: value =>
                      value === watch('password') ||
                      '비밀번호가 일치하지 않습니다',
                  })}
                  type="password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="비밀번호 확인"
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {isLogin ? '로그인' : '회원가입'}
            </button>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  소셜 계정으로 계속하기
                </span>
              </div>
            </div>

            <div className="mt-4 mb-4 sm:mb-0 flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500]"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="/kakao-logo.png"
                  alt="Kakao"
                />
                <span className="text-sm text-gray-900 sm:hidden">
                  카카오 로그인
                </span>
                <span className="sr-only sm:not-sr-only sm:hidden">
                  카카오 로그인
                </span>
              </button>

              <button
                type="button"
                onClick={handleNaverLogin}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-[#03C75A] hover:bg-[#03C75A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#03C75A]"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="/naver-logo.png"
                  alt="Naver"
                />
                <span className="text-sm text-white sm:hidden">
                  네이버 로그인
                </span>
                <span className="sr-only sm:not-sr-only sm:hidden">
                  네이버 로그인
                </span>
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-[#24292e] hover:bg-[#24292e]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24292e]"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="/github-logo.png"
                  alt="GitHub"
                />
                <span className="text-sm text-white sm:hidden">
                  깃허브 로그인
                </span>
                <span className="sr-only sm:not-sr-only sm:hidden">
                  깃허브 로그인
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

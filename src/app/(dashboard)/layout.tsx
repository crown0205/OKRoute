'use client';

import Header from '@/components/common/Header';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/learning', label: 'Learning' },
  { href: '/okr', label: 'OKR' },
  { href: '/todo', label: 'Todo' },
  { href: '/planner', label: 'Planner' },
  { href: '/reflection', label: 'Reflection' },
  // { href: '/settings', label: 'Settings' },
];

const quotes = [
  { text: '살아 있는 한 희망은 있다', author: '키케로' },
  { text: '노력은 배신하지 않는다', author: '박지성' },
  { text: '실패는 성공의 어머니다', author: '토마스 에디슨' },
  { text: '시작이 반이다', author: '아리스토텔레스' },
  {
    text: '오늘 할 수 있는 일을 내일로 미루지 마라',
    author: '벤자민 프랭클린',
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentLink = mainLinks.find(link => link.href === pathname);

  const [quoteIndex, setQuoteIndex] = useState(0);

  // 현재 명언을 메모이제이션
  const currentQuote = useMemo(() => quotes[quoteIndex], [quoteIndex]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuoteIndex(randomIndex);

    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 600000);

    return () => clearInterval(interval);
  }, []); // quotes는 상수이므로 의존성 배열에서 제외

  return (
    <div className="flex flex-col gap-2 sm:gap-2 p-2 sm:p-4 max-w-screen-lg mx-auto w-full">
      <Header />
      {/* 헤더 섹션 반응형 개선 */}
      <div className="py-4 sm:py-6 lg:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            OKRoute Dashboard
          </h1>

          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/profile-placeholder.png"
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-blue-500 ring-offset-2"
            />
            <div>
              <p className="text-sm sm:text-base lg:text-lg font-medium">
                Min-Ji
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                1분기 OKR 진행중
              </p>
            </div>
          </div>
        </div>

        {/* 명언 섹션 반응형 개선 */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 lg:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h2 className="text-base sm:text-lg lg:text-xl font-medium mb-2 flex items-center gap-2">
            <span className="text-blue-500">💡</span> 오늘의 명언
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic">
            &quot;{currentQuote.text}&quot; - {currentQuote.author}
          </p>
        </div>

        {/* 네비게이션 반응형 개선 */}
        <nav className="border-b  overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 min-w-max pb-1">
            {mainLinks.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  py-2 sm:py-3 px-3 sm:px-4 rounded-t-lg transition-colors text-sm sm:text-base
                  ${
                    item.label === currentLink?.label
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-500 text-blue-500 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4">{children}</div>
    </div>
  );
}

export default DashboardLayout;

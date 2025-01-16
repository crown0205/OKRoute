const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/learning', label: 'Learning' },
  { href: '/okr', label: 'OKR' },
  { href: '/todo', label: 'Todo' },
  { href: '/planner', label: 'Planner' },
  { href: '/reflection', label: 'Reflection' },
  { href: '/settings', label: 'Settings' },
];

function DashboardPage() {
  return (
    <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
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
            &quot;살아 있는 한 희망은 있다&quot; - 키케로
          </p>
        </div>

        {/* 네비게이션 반응형 개선 */}
        <nav className="border-b  overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 min-w-max pb-1">
            {[
              'Dashboard',
              'Learning',
              'OKR',
              'Todo',
              'Planner',
              'Reflection',
            ].map(item => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`
                  py-2 sm:py-3 px-3 sm:px-4 rounded-t-lg transition-colors text-sm sm:text-base
                  ${
                    item === 'Dashboard'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-500 text-blue-500 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* 대시보드 컨텐츠 그리드 반응형 개선 */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Learning 섹션 */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold dark:text-white flex items-center gap-2">
                <span className="text-blue-500">📚</span> Learning
              </h2>
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                <span className="sr-only">더보기</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            {/* 차트 컴포넌트 */}
            <div className="h-36 sm:h-48 bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
          </div>

          {/* Todo 섹션 */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Todo</h2>
              <button>...</button>
            </div>
            {/* Todo 리스트 컴포넌트 추가 예정 */}
          </div>

          {/* OKR Achievements 섹션 */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">
                OKR Achievements
              </h2>
              <button>...</button>
            </div>
            {/* 차트 컴포넌트 추가 예정 */}
          </div>
        </div>

        {/* Planner 섹션 */}
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">Planner</h2>
            <button>...</button>
          </div>
          {/* 차트 컴포넌트 추가 예정 */}
        </div>

        {/* Reflection 섹션 */}
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">
              Reflection
            </h2>
            <button>...</button>
          </div>
          {/* 차트 컴포넌트 추가 예정 */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

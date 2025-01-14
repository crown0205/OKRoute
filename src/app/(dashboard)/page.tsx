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
    <div>
      {/* 헤더 영역 */}
      <div className="py-4 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          OKRoute Dashboard
        </h1>

        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
          />
          <p className="text-base sm:text-lg text-gray-600">
            Min-Ji 의 1분기 OKR을 진행해보아요.
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-medium mb-2">명언</h2>
          <p className="text-gray-600">
            &quot;살아 있는 한 희망은 있다 - 키케로&quot;
          </p>
        </div>

        {/* 네비게이션 */}
        <nav className="border-b overflow-x-auto">
          <div className="flex gap-6 sm:gap-12 min-w-max pb-1">
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
                className={`pb-3 px-1 sm:px-2 ${
                  item === 'Dashboard'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* 기존 대시보드 컨텐츠 */}
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Learning 섹션 */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">
                Learning
              </h2>
              <button>...</button>
            </div>
            {/* 차트 컴포넌트 추가 예정 */}
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

          {/* Todo 섹션 */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">Todo</h2>
              <button>...</button>
            </div>
            {/* Todo 리스트 컴포넌트 추가 예정 */}
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

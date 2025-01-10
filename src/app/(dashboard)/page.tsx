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
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">OKRoute Dashboard</h1>

        <div className="flex items-center gap-4 mb-8">
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />
          <p className="text-lg text-gray-600">
            Min-Ji 의 1분기 OKR을 진행해보아요.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">명언</h2>
          <p className="text-gray-600">
            &quot;살아 있는 한 희망은 있다 - 키케로&quot;
          </p>
        </div>

        {/* 네비게이션 */}
        <nav className="border-b">
          <div className="flex gap-12">
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
                className={`pb-4 px-2 ${
                  item === 'Learning'
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
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Learning 섹션 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Learning</h2>
              <button>...</button>
            </div>
            {/* 차트 컴포넌트 추가 예정 */}
          </div>

          {/* OKR Achievements 섹션 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">OKR Achievements</h2>
              <button>...</button>
            </div>
            {/* 차트 컴포넌트 추가 예정 */}
          </div>

          {/* Todo 섹션 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Todo</h2>
              <button>...</button>
            </div>
            {/* Todo 리스트 컴포넌트 추가 예정 */}
          </div>
        </div>

        {/* Planner 섹션 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Planner</h2>
            <button>...</button>
          </div>
          {/* 차트 컴포넌트 추가 예정 */}
        </div>

        {/* Reflection 섹션 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reflection</h2>
            <button>...</button>
          </div>
          {/* 차트 컴포넌트 추가 예정 */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

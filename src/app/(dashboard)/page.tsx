function DashboardPage() {
  return (
    <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
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

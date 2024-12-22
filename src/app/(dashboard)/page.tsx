import LearningSection from '@/components/learning/LearningSection';
import OKRSection from '@/components/okr/OKRSection';
import ReferenceSection from '@/components/reference/ReferenceSection';
import TodoSection from '@/components/todo/TodoSection';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">OKRoute 📊</h1>

      <LearningSection />

      <hr />
      <OKRSection />

      <hr />
      <TodoSection />
      {/* <ReferenceSection /> */}

      {/* 플래너 영역 */}

      {/* 분기별 피드백 영역 */}
    </div>
  );
}

export default DashboardPage;

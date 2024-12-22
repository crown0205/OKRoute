import LearningSection from '@/components/learning/LearningSection';
import OKRSection from '@/components/okr/OKRSection';
import TodoSection from '@/components/todo/TodoSection';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">OKRoute 📊</h1>

      <LearningSection />

      <OKRSection />

      <TodoSection />
    </div>
  );
}

export default DashboardPage;

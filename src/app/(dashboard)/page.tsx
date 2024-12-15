import LearningSection from '@/components/learning/LearningSection';
import OKRSection from '@/components/okr/OKRSection';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">OKRoute</h1>

      <LearningSection />

      <OKRSection />
    </div>
  );
}

export default DashboardPage;

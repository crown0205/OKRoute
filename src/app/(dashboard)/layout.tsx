import Header from '@/components/common/Header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-4 max-w-screen-lg mx-auto">
      <Header />
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </div>
  );
}

export default DashboardLayout;

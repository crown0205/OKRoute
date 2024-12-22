import Header from '@/components/common/Header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-4 max-w-screen-md mx-auto">
      <Header />
      {children}
    </div>
  );
}

export default DashboardLayout;

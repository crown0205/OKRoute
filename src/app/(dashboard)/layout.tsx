function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-4 max-w-screen-lg mx-auto">
      {children}
    </div>
  );
}

export default DashboardLayout;

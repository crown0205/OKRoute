import AccountSettings from './AccountSettings';

function SettingsSection() {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col items-center relative">
        <div className="relative h-48 rounded-lg mb-16 w-full overflow-hidden">
          <img
            src="/city-background.jpg"
            alt="배경"
            className="w-full h-full object-cover bg-gray-200"
          />
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-800">
            <img
              src="/profile-image.jpg"
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">홍길동</h2>
        <p className="text-gray-500 text-sm">okroute_user</p>
        <div className="flex justify-center gap-4 mt-2">
          <div className="text-sm">
            <span>1200</span> followers
          </div>
          <div className="text-sm">
            <span>300</span> following
          </div>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <section>
          <h3 className="text-lg font-semibold mb-4">계정 관리</h3>
          <AccountSettings />
        </section>
      </div>
    </div>
  );
}

export default SettingsSection;

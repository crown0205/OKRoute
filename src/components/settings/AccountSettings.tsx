function AccountSettings() {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/profile-image.jpg"
            alt="프로필"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">닉네임</span>
            <span className="text-sm">홍길동</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 space-y-3">
        <button
          // onClick={handleLogout}
          className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors text-sm"
        >
          로그아웃
        </button>

        <button
          // onClick={handleDeleteAccount}
          className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors text-sm"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;

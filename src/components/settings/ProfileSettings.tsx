'use client';

interface ProfileSettingsProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

function ProfileSettings({ isEditing, setIsEditing }: ProfileSettingsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">프로필 설정</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          {isEditing ? '저장' : '수정'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이름</label>
          <input
            type="text"
            disabled={!isEditing}
            className="p-2 rounded-md border border-gray-300 disabled:bg-gray-100"
            placeholder="홍길동"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이메일</label>
          <input
            type="email"
            disabled={!isEditing}
            className="p-2 rounded-md border border-gray-300 disabled:bg-gray-100"
            placeholder="example@email.com"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;

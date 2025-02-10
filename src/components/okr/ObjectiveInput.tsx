import { CardLayout } from '../common';

interface ObjectiveInputProps {
  objective: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export function ObjectiveInput({
  objective,
  onChange,
  onDelete,
  canDelete,
}: ObjectiveInputProps) {
  return (
    <div className="relative flex-1 group">
      <div className="flex flex-row gap-2 items-center h-[42px] px-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-950/50 transition-all">
        <input
          type="text"
          value={objective}
          onChange={e => onChange(e.target.value)}
          placeholder="Objective를 입력하세요"
          className="flex-1 text-sm bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-200 placeholder-neutral-400"
        />
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-500 transition-all rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
          disabled={!canDelete}
          title={!canDelete ? '최소 1개의 OKR이 필요합니다' : 'OKR 삭제'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

interface KeyResultItemProps {
  keyResult: {
    value: string;
    isChecked: boolean;
    paddingLeft: number;
  };
  onToggleCheck: () => void;
  onChangeValue: (value: string) => void;
  onEnterPress: () => void;
  okrIndex: number;
  keyResultIndex: number;
}

export function KeyResultItem({
  keyResult,
  onToggleCheck,
  onChangeValue,
  onEnterPress,
  okrIndex,
  keyResultIndex,
}: KeyResultItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div
      className="flex flex-row gap-2 items-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-950/50 transition-all"
      style={{ paddingLeft: `${keyResult.paddingLeft + 8}px` }}
    >
      <button
        onClick={onToggleCheck}
        className="relative w-5 h-5 flex-shrink-0"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full border-[1.5px] transition-all duration-200',
            keyResult.isChecked
              ? 'border-blue-500 bg-blue-500'
              : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400',
          )}
        >
          {keyResult.isChecked && (
            <svg
              className="w-full h-full text-white p-[3px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M20 6L9 17L4 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>
      <input
        className={cn(
          'flex-1 text-sm bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-200 placeholder-neutral-400',
          keyResult.isChecked && 'text-neutral-500 line-through',
        )}
        value={keyResult.value}
        placeholder="핵심 결과를 입력하세요"
        onChange={e => onChangeValue(e.target.value)}
        data-okr-index={okrIndex}
        data-kr-index={keyResultIndex}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

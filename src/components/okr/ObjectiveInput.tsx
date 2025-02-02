import { CardLayout } from '../common';

interface ObjectiveInputProps {
  objective: string;
  onChange: (value: string) => void;
}

export function ObjectiveInput({ objective, onChange }: ObjectiveInputProps) {
  return (
    <CardLayout className="bg-neutral-50 dark:bg-neutral-900/50">
      <div className="flex flex-row gap-2 items-center">
        <span>💡</span>
        <input
          className="flex-1 text-sm whitespace-pre-line break-keep text-neutral-800 dark:text-white bg-transparent focus:outline-none"
          value={objective}
          placeholder="목표를 입력하세요"
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </CardLayout>
  );
}

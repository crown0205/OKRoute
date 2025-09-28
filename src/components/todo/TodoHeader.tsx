import { BiSolidDownArrow } from 'react-icons/bi';
import { cn } from '@/lib/utils';

interface TodoHeaderProps {
  title: string;
  isShowTodo: boolean;
  onToggleShow: () => void;
}

export function TodoHeader({
  title,
  isShowTodo,
  onToggleShow,
}: TodoHeaderProps) {
  return (
    <div className="flex flex-row gap-2 items-center mb-2">
      <button className="py-1" onClick={onToggleShow}>
        <BiSolidDownArrow
          className={cn(
            'text-black dark:text-[#fff] transition-transform duration-200',
            !isShowTodo ? '-rotate-90' : '',
          )}
        />
      </button>
      <h3 className="text-ml font-bold">{title}</h3>
    </div>
  );
}

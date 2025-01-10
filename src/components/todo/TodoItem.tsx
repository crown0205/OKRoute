import { cn } from '@/lib/utils';
import { memo, forwardRef } from 'react';
import { ITodo } from '@/types/todo';

interface TodoItemProps {
  todo: ITodo;
  index: number;
  onToggleComplete: (index: number) => void;
  onUpdateContent: (index: number, content: string) => void;
  onKeyPress: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
  (
    { todo, index, onToggleComplete, onUpdateContent, onKeyPress, onKeyDown },
    ref,
  ) => {
    return (
      <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg group hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
        <button
          onClick={() => onToggleComplete(index)}
          className="relative w-5 h-5 flex-shrink-0"
        >
          <div
            className={`
            absolute inset-0 rounded-full border-[1.5px] transition-all duration-200
            ${
              todo.isCompleted
                ? 'border-blue-500 bg-blue-500'
                : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400'
            }
          `}
          >
            {todo.isCompleted && (
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
          ref={ref}
          className={cn(
            'flex-1 bg-transparent focus:outline-none',
            todo.isCompleted && 'text-gray-500 line-through',
          )}
          value={todo.value}
          placeholder="할 일"
          onChange={e => onUpdateContent(index, e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';

export default TodoItem;

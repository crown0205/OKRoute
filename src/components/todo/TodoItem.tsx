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
    console.log({ todo: todo.id });
    return (
      <div className="flex flex-row gap-2 items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(index)}
        />
        <input
          ref={ref}
          className={cn(
            'flex-1 bg-transparent focus:outline-none',
            todo.isCompleted && 'text-gray-500 line-through',
          )}
          value={todo.value}
          placeholder="할 일"
          onChange={e => onUpdateContent(index, e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') onKeyPress();
            onKeyDown(e);
          }}
        />
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';

export default TodoItem;

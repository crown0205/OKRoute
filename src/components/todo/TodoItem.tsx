import { cn } from '@/lib/utils';
import { memo } from 'react';
import { ITodo } from '@/types/todo';

interface TodoItemProps {
  todo: ITodo;
  index: number;
  onToggleComplete: (index: number) => void;
  onUpdateContent: (index: number, content: string) => void;
  onKeyPress: () => void;
}

const TodoItem = memo(
  ({
    todo,
    index,
    onToggleComplete,
    onUpdateContent,
    onKeyPress,
  }: TodoItemProps) => {
    return (
      <div className="flex flex-row gap-2 items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(index)}
        />
        <input
          className={cn(
            'flex-1 bg-transparent focus:outline-none',
            todo.isCompleted && 'text-gray-500 line-through',
          )}
          value={todo.value}
          placeholder="할 일"
          onChange={e => onUpdateContent(index, e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onKeyPress();
            }
          }}
        />
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';

export default TodoItem;

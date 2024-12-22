'use client';

import { cn } from '@/lib/utils';
import { memo, useCallback, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import Title from '../common/Title';

interface ITodo {
  id: string;
  value: string;
  isCompleted: boolean;
}

interface ITodoList {
  id: string;
  isShowTodo: boolean;
  todos: ITodo[];
}

const TODO_INITIAL_STATE: ITodoList = {
  id: uuidv4(),
  isShowTodo: true,
  todos: [
    {
      id: uuidv4(),
      value: '',
      isCompleted: false,
    },
  ],
};

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
      <div key={index} className="flex flex-row gap-2 items-center">
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

function Todo({ title }: { title: string }) {
  const [todoList, setTodoList] = useState<ITodoList>(TODO_INITIAL_STATE);

  const handleToggleComplete = useCallback((index: number) => {
    setTodoList(prev => ({
      ...prev,
      todos: prev.todos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    }));
  }, []);

  const handleUpdateContent = useCallback((index: number, value: string) => {
    setTodoList(prev => ({
      ...prev,
      todos: prev.todos.map((todo, i) =>
        i === index ? { ...todo, value } : todo,
      ),
    }));
  }, []);

  const handleAddTodo = useCallback(() => {
    setTodoList(prev => ({
      ...prev,
      todos: [
        ...prev.todos,
        {
          id: uuidv4(),
          value: '',
          isCompleted: false,
        },
      ],
    }));
  }, []);

  return (
    <div className="flex-1">
      <div className="flex flex-row gap-2 items-center mb-2">
        <button
          className="py-1"
          onClick={() =>
            setTodoList(prev => ({
              ...prev,
              isShowTodo: !prev.isShowTodo,
            }))
          }
        >
          <BiSolidDownArrow
            className={cn(
              'text-black dark:text-[#fff] transition-transform duration-200',
              !todoList.isShowTodo ? '-rotate-90' : '',
            )}
          />
        </button>
        <h3 className="text-ml font-bold">{title}</h3>
      </div>

      <div className="flex flex-col gap-2">
        {todoList.isShowTodo &&
          todoList.todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggleComplete={handleToggleComplete}
              onUpdateContent={handleUpdateContent}
              onKeyPress={handleAddTodo}
            />
          ))}
      </div>
    </div>
  );
}

function TodoSection() {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <Title>Todo</Title>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <Todo title="Personal" />
        <Todo title="Work" />
      </div>
    </div>
  );
}

export default TodoSection;

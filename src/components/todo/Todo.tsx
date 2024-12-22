'use client';

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BiSolidDownArrow } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { ITodoList } from '@/types/todo';
import TodoItem from './TodoItem';

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

interface TodoProps {
  title: string;
}

function Todo({ title }: TodoProps) {
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

export default Todo;

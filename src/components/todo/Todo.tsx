'use client';

import { useTodoHandlers } from '@/hooks/useTodoHandlers';
import { ITodo, ITodoList } from '@/types/todo';
import { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';

const createInitialTodo = (): ITodo => ({
  id: uuidv4(),
  value: '',
  isCompleted: false,
});

const TODO_INITIAL_STATE: ITodoList = {
  id: uuidv4(),
  isShowTodo: true,
  todos: [createInitialTodo()],
};

interface TodoProps {
  title: string;
}

function Todo({ title }: TodoProps) {
  const [todoList, setTodoList] = useState<ITodoList>(TODO_INITIAL_STATE);
  const todoRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isShowCompleted, setIsShowCompleted] = useState(true);

  const {
    handleKeyDown,
    handleToggleComplete,
    handleUpdateContent,
    handleAddTodo,
  } = useTodoHandlers({ todoList, setTodoList, todoRefs });

  const handleToggleShow = useCallback(() => {
    setTodoList(prev => ({
      ...prev,
      isShowTodo: !prev.isShowTodo,
    }));
  }, []);

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-1">
            {title}
          </h1>
          <p className="text-sm text-neutral-500">
            {todoList.todos.filter(t => t.isCompleted).length}/
            {todoList.todos.length} completed
          </p>
        </div>
        <button
          onClick={() => setIsShowCompleted(!isShowCompleted)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-sm"
        >
          {isShowCompleted ? '완료된 항목 숨기기' : '완료된 항목 보기'}
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {todoList.todos
          .filter(todo => !todo.isCompleted || isShowCompleted)
          .map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              ref={(el: HTMLInputElement | null) => {
                todoRefs.current[index] = el;
              }}
              onKeyDown={e => handleKeyDown(index, e)}
              onToggleComplete={handleToggleComplete}
              onUpdateContent={handleUpdateContent}
              onKeyPress={() => handleAddTodo(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default Todo;

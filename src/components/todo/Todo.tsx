'use client';

import { useState, useCallback, useRef } from 'react';
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
  console.log({ todoList });

  // 현재 포스된 todo의 ref를 저장하기 위한 배열
  const todoRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (index < todoList.todos.length - 1) {
          todoRefs.current[index + 1]?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (index > 0) {
          todoRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'Backspace' && todoList.todos[index].value === '') {
        e.preventDefault();
        // 첫 번째 todo이거나 todo가 하나만 있는 경우는 삭제하지 않음
        if (index > 0) {
          setTodoList(prev => ({
            ...prev,
            todos: prev.todos.filter((_, i) => i !== index),
          }));
          // 삭제 후 이전 todo로 포커스 이동
          setTimeout(() => {
            todoRefs.current[index - 1]?.focus();
          }, 0);
        }
      }
    },
    [todoList.todos],
  );

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

  const handleAddTodo = useCallback((index: number) => {
    setTodoList(prev => {
      const newTodos = [...prev.todos];
      newTodos.splice(index + 1, 0, {
        id: uuidv4(),
        value: '',
        isCompleted: false,
      });
      return {
        ...prev,
        todos: newTodos,
      };
    });

    // NOTE: 새로운 todo가 생성된 후 다음 렌더링에서 포커스 이동
    setTimeout(() => {
      todoRefs.current[index + 1]?.focus();
    }, 0);
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

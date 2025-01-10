'use client';

import { ITodo, ITodoList } from '@/types/todo';
import { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTodoHandlers } from '@/hooks/useTodoHandlers';
import { TodoHeader } from './TodoHeader';
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
    <div className="flex-1">
      <TodoHeader
        title={title}
        isShowTodo={todoList.isShowTodo}
        onToggleShow={handleToggleShow}
      />

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

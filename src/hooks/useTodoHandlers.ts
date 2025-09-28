import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ITodoList } from '@/types/todo';

interface UseTodoHandlersProps {
  todoList: ITodoList;
  setTodoList: React.Dispatch<React.SetStateAction<ITodoList>>;
  todoRefs: React.RefObject<(HTMLInputElement | null)[]>;
}

export function useTodoHandlers({
  todoList,
  setTodoList,
  todoRefs,
}: UseTodoHandlersProps) {
  const handleAddTodo = useCallback(
    (index: number) => {
      let isProcessing = false;

      if (!isProcessing) {
        isProcessing = true;
        setTodoList(prev => {
          const newTodos = [...prev.todos];
          newTodos.splice(index + 1, 0, {
            id: uuidv4(),
            value: '',
            isCompleted: false,
          });
          return { ...prev, todos: newTodos };
        });

        if (todoRefs.current) {
          setTimeout(() => {
            todoRefs.current?.[index + 1]?.focus();
            isProcessing = false;
          }, 0);
        }
      }
    },
    [todoRefs, setTodoList],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAddTodo(index);
        return;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (index < todoList.todos.length - 1 && todoRefs.current) {
          todoRefs.current[index + 1]?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (index > 0 && todoRefs.current) {
          todoRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'Backspace' && todoList.todos[index].value === '') {
        e.preventDefault();
        if (index > 0) {
          setTodoList(prev => ({
            ...prev,
            todos: prev.todos.filter((_, i) => i !== index),
          }));
          if (todoRefs.current) {
            setTimeout(() => {
              todoRefs.current?.[index - 1]?.focus();
            }, 0);
          }
        }
      }
    },
    [todoList.todos, todoRefs, setTodoList],
  );

  const handleToggleComplete = useCallback(
    (index: number) => {
      setTodoList(prev => ({
        ...prev,
        todos: prev.todos.map((todo, i) =>
          i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        ),
      }));
    },
    [setTodoList],
  );

  const handleUpdateContent = useCallback(
    (index: number, value: string) => {
      setTodoList(prev => ({
        ...prev,
        todos: prev.todos.map((todo, i) =>
          i === index ? { ...todo, value } : todo,
        ),
      }));
    },
    [setTodoList],
  );

  return {
    handleKeyDown,
    handleToggleComplete,
    handleUpdateContent,
    handleAddTodo,
  };
}

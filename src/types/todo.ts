export interface ITodo {
  id: string;
  value: string;
  isCompleted: boolean;
}

export interface ITodoList {
  id: string;
  isShowTodo: boolean;
  todos: ITodo[];
}

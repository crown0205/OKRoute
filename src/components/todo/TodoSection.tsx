import Title from '../common/Title';
import Todo from './Todo';

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

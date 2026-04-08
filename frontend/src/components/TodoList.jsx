import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, loading }) => {
 

  if (!todos || todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add a task above to get started!</p>
      </div>
    );
  }

  // Active tasks first, then completed ones
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <h2>Your Tasks <span>({todos.length})</span></h2>
        <div className="stats">
          <span className="stat-badge">
            {todos.filter(t => t.completed).length} Completed
          </span>
        </div>
      </div>
      <div className="todo-list">
        {sortedTodos.map((todo, index) => (
          <TodoItem 
            key={index} 
            todo={todo} 
            loading={loading}
            index={todos.findIndex(t => t === todo)} 
            onToggle={onToggle} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

import './TodoItem.css';

const TodoItem = ({ todo, index, onToggle,loading }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${loading ? 'disabled' : ''}`}>
      <div 
        className="todo-checkbox" 
        onClick={() => !loading && onToggle && onToggle(index)}
      >
        {todo.completed && (
          <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
      </div>
      {todo.completed && <span className="status-badge">Done</span>}
    </div>
  );
};

export default TodoItem;

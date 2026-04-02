import React, { useState } from 'react';
import './TodoInput.css';

const TodoInput = ({ onAdd, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    await onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder={disabled ? "Connect wallet to add tasks..." : "What needs to be done?"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="btn-add"
        disabled={disabled || !inputValue.trim()}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Task
      </button>
    </form>
  );
};

export default TodoInput;

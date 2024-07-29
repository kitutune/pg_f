// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };

    axios.post('http://localhost:8000/todos', newTodo).then((response) => {
      setTodos([...todos, response.data]);
      setTitle('');
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Incomplete'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

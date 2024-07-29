// src/App.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    axios.get<Todo[]>('http://localhost:8000/todos')
      .then((response) => {
        setTodos(response.data);
      });
  }, []);

  const addTodo = () => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };

    axios.post<Todo>('http://localhost:8000/todos', newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle('');
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
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

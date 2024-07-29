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

  const updateTodo = (id: number) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.completed = !updatedTodo.completed;
      axios.put<Todo>(`http://localhost:8000/todos/${id}`, updatedTodo)
        .then((response) => {
          setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        });
    }
  };

  const deleteTodo = (id: number) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
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
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => updateTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

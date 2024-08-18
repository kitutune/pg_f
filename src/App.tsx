import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // すべてのTodoを取得
  useEffect(() => {
    axios
      .get<Todo[]>("http://localhost:8000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // 新しいTodoを追加
  const addTodo = () => {
    const newTodoItem = {
      title: newTodo,
      completed: false,
    };

    axios
      .post<Todo>("http://localhost:8000/todos", newTodoItem)
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  // Todoを更新
  const updateTodo = (todo: Todo) => {
    axios
      .put<Todo>(`http://localhost:8000/todos/${todo.id}`, todo)
      .then((response) => {
        setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  // Todoを削除
  const deleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

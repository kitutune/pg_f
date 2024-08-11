import React, { useState, useEffect, useReducer } from 'react';

// 型定義: TODOアイテムの型
interface Todo {
  id: number; // ユニークなID
  task: string; // タスクの内容
  completed: boolean; // タスクが完了したかどうか
}

// 型定義: Reducerのアクションの型
type Action =
  | { type: 'ADD_TODO'; payload: string } // タスク追加のアクション
  | { type: 'TOGGLE_TODO'; payload: number } // タスク完了状態を切り替えるアクション
  | { type: 'DELETE_TODO'; payload: number }; // タスク削除のアクション

// Reducer関数: 状態とアクションに基づいて新しい状態を返す
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), task: action.payload, completed: false },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// メインコンポーネント
const App: React.FC = () => {
  // useReducerを使ってTODOリストを管理
  const [todos, dispatch] = useReducer(todoReducer, []);

  // 新しいタスクの入力値を保持する状態
  const [newTask, setNewTask] = useState<string>(''); 

  // フォーム送信時にタスクを追加するハンドラ
  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTask.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTask });
      setNewTask(''); // タスク追加後に入力フィールドをリセット
    }
  };

  // タスクの完了状態を切り替えるハンドラ
  const handleToggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // タスクを削除するハンドラ
  const handleDeleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>TODOアプリ</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.task}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

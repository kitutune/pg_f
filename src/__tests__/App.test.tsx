// src/__tests__/App.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
// 下記を入れると型エラーが消える
// import '@testing-library/jest-dom';

// テストケース: アプリが正常にレンダリングされるか
test('renders the TODO app', () => {
  render(<App />);
  expect(screen.getByText('TODOアプリ')).toBeInTheDocument();
});

// テストケース: タスクを追加できるか
test('can add a new task', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('新しいタスクを入力');
  const addButton = screen.getByText('追加');

  fireEvent.change(input, { target: { value: '新しいタスク' } });
  fireEvent.click(addButton);

  expect(screen.getByText('新しいタスク')).toBeInTheDocument();
});

// テストケース: タスクを完了状態にできるか
test('can toggle task completion', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('新しいタスクを入力');
  const addButton = screen.getByText('追加');

  fireEvent.change(input, { target: { value: '完了するタスク' } });
  fireEvent.click(addButton);

  const task = screen.getByText('完了するタスク');
  fireEvent.click(task);

  expect(task).toHaveStyle('text-decoration: line-through');
});

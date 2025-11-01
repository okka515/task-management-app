import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 

import TaskItem from './TaskItem';
import { Task } from '../App';

// --- モック(Mocks)の準備 ---

// FaTrash を span data-testid="trash-icon"に置き換える
jest.mock('react-icons/fa', () => ({
  FaTrash: () => <span data-testid="trash-icon" />
}));

// モック関数を作成
const mockToggle = jest.fn();
const mockDelete = jest.fn();

// テスト用のダミーデータ
const mockTaskIncomplete: Task = {
  id: 1, 
  title: "未完了のタスク",
  completed: false,
};

const mockTaskCompleted: Task = {
  id: 2,
  title: "完了したタスク",
  completed: true,
};

// --- テストスイート ---

describe('TaskItem コンポーネント', () => {

  it('未完了タスクのタイトルとチェックボックスが正しく表示される', () => {
    render(
      <TaskItem
        task={mockTaskIncomplete}
        onToggleTaskCompleted={mockToggle}
        onClickDeleteTask={mockDelete}
      />
    );

    // "未完了のタスク" というテキストが画面に存在するか確認
    expect(screen.getByText("未完了のタスク")).toBeInTheDocument();

    // チェックボックスが画面に存在し、チェックされていないことを確認
    const checkbox = screen.getByRole('checkbox'); 
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('完了タスクのタイトルとチェックボックスが正しく表示される', () => {
    // "完了したタスク" で描画
    render(
      <TaskItem
        task={mockTaskCompleted}
        onToggleTaskCompleted={mockToggle}
        onClickDeleteTask={mockDelete}
      />
    );

    // "完了したタスク" というテキストが存在するか確認
    expect(screen.getByText("完了したタスク")).toBeInTheDocument();
    
    // チェックボックスが画面に存在し、チェックされていることを確認
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });


  it('削除ボタンをクリックすると onClickDeleteTask が正しいIDで呼ばれる', () => {
    // モック関数をリセット (他のテストの影響を受けないように)
    mockDelete.mockClear();

    // コンポーネントを描画
    render(
      <TaskItem
        task={mockTaskIncomplete}
        onToggleTaskCompleted={mockToggle}
        onClickDeleteTask={mockDelete}
      />
    );
    
    // "タスクを削除" の aria-label を持つボタンを探してクリック
    const deleteButton = screen.getByLabelText("タスクを削除");
    fireEvent.click(deleteButton);

    // mockDelete が1回だけ呼ばれたことを確認
    expect(mockDelete).toHaveBeenCalledTimes(1);
    
    // mockDelete が正しいID (1) で呼ばれたことを確認
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('チェックボックスをクリックすると onToggleTaskCompleted が正しいタスクで呼ばれる', () => {
    // モック関数をリセット
    mockToggle.mockClear();
    
    // コンポーネントを描画
    render(
      <TaskItem
        task={mockTaskIncomplete}
        onToggleTaskCompleted={mockToggle}
        onClickDeleteTask={mockDelete}
      />
    );

    // チェックボックスを探してクリック
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // mockToggle が1回だけ呼ばれたことを確認
    expect(mockToggle).toHaveBeenCalledTimes(1);

    // mockToggle が正しいタスクオブジェクト (mockTaskIncomplete) で呼ばれたことを確認
    expect(mockToggle).toHaveBeenCalledWith(mockTaskIncomplete);
  });
});
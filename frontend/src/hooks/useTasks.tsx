// useTasksのフック作成
// Taskに関する機能の一元管理を行う
import React, { useCallback, useEffect } from 'react';
import { Task } from '../App';

export const useTasks = () => {
    const API_URL = 'http://127.0.0.1:8000';

    const [tasks, setTasks] = React.useState<Task[]>([]);

    // タスク一覧の取得
    // 何かが変わったときに実行される
    useEffect(() => {
        const fetchTasks = async () => {
            // ここでAPIからタスクを取得する処理を実装
            try {
                const response = await fetch(`${API_URL}/tasks`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('タスクの取得に失敗しました:', error);
            }
        }
    },[]);

    // タスクの追加
    // 不要なレンダリング対策のためuseCallbackを使用
    const onCreateTask = useCallback(async (title: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            const newTask: Task = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask]);
            return true;
        } catch (error) {
            console.error('タスクの追加に失敗しました:', error);
            return false;
        }
    }, []);

    // タスクの完了状態切り替え
    const toggleTaskCompleted = useCallback(async (task: Task): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/${task.id}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !task.completed }),
            });
            const updatedTask: Task = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
            return true;
        } catch (error) {
            console.error('タスクの更新に失敗しました:', error);
            return false;
        }
    }, [])
    
    // タスクの削除
    const deleteTask = useCallback(async (taskId: number): Promise<boolean> => {
        try {
            await fetch(`${API_URL}/tasks/${taskId}`, {
                method: 'DELETE',
            });
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
            return true;
        } catch (error) {
            console.error('タスクの削除に失敗しました:', error);
            return false;
        }   
    }, []);

    return {
        tasks,
        onCreateTask,
        toggleTaskCompleted,
        deleteTask,
    };
}


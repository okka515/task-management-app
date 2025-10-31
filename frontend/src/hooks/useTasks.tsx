import React, { useCallback, useEffect } from 'react';
import { Task } from '../App';

// カスタムフック　useTasksの定義
export const useTasks = () => {

    // APIのベースURL
    const API_URL = 'http://127.0.0.1:8000';

    // taskの状態管理
    const [tasks, setTasks] = React.useState<Task[]>([]);

    // ---タスク一覧の取得--- //
    // 何かが変わったときに実行される
    useEffect(() => {
        const fetchTasks = async () => {
            // ここでAPIからtasksを取得する処理を実装
            try {
                const response = await fetch(`${API_URL}/tasks`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('タスクの取得に失敗しました:', error);
            }
        }
        fetchTasks();
    },[]);

    // 以下不要なレンダリング対策のためuseCallbackを使用

    // ---タスクの追加--- //
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

    // ---タスクの完了状態切り替え--- //
    const onToggleTaskCompleted = useCallback(async (task: Task): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                method: 'PATCH',
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
    
    // ---タスクの削除--- //
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
        onToggleTaskCompleted,
        deleteTask,
    };
}


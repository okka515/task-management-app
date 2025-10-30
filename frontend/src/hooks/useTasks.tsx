// useTasksのフック作成
// Taskに関する機能の一元管理を行う
import React, { useCallback, useEffect } from 'react';
import { Task } from '../App';

const useTasks = () => {

    const [tasks, setTasks] = React.useState<Task[]>([]);

    // タスク一覧の取得
    // 何かが変わったときに実行される
    useEffect(() => {
        const fetchTasks = async () => {
            // ここでAPIからタスクを取得する処理を実装
            try {
                const response = await fetch('API_URLをここに記述');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('タスクの取得に失敗しました:', error);
            }
        }
    },[]);

    // タスクの追加
    // 不要なレンダリング対策のためuseCallbackを使用
    const createTask = useCallback(async (title: string) => {
        try {
            const response = await fetch('API_URLをここに記述', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            const newTask: Task = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('タスクの追加に失敗しました:', error);
        }
    }, []);


    // タスクの完了状態切り替え
    // タスクの削除
}


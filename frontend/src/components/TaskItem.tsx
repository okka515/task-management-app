import React from 'react';
import { Task } from '../App'
import { FaTrash } from 'react-icons/fa'; // アイコンライブラリからゴミ箱アイコンをインポート

// TaskItemコンポーネントのpropsの型定義
// onToggleTaskConpletedとonClickDeleteTaskはTaskItemListから渡される
interface TaskItemProps {
    task: Task;
    onToggleTaskCompleted: (task: Task) => Promise<boolean>;
    onClickDeleteTask: (id: number) => Promise<boolean>;
}

const TrashIcon: React.ElementType = FaTrash as unknown as React.ElementType; // ゴミ箱アイコンの型定義

const TaskItem: React.FC<TaskItemProps> = ({task, onToggleTaskCompleted, onClickDeleteTask}: TaskItemProps) => {
    return (
            <li className={task.completed ? 'completed' : ''}>       
                <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTaskCompleted(task)}
                    aria-label={task.completed ? "タスクを未完了に戻す" : "タスクを完了にする"}
                 />
                <span className='task-title'>{task.title}</span>
                <button onClick={() => onClickDeleteTask(task.id)} className='delete-button' aria-label='タスクを削除'>
                    <TrashIcon />
                </button>
            </li>
    )
}

export default TaskItem;
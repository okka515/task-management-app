import React from 'react';
import { Task } from '../App'

// TaskItemコンポーネントのpropsの型定義
// onToggleTaskConpletedとonClickDeleteTaskはTaskItemListから渡される
interface TaskItemProps {
    task: Task;
    onToggleTaskCompleted: (task: Task) => void;
    onClickDeleteTask: (id: number) => void;
}



const TaskItem: React.FC<TaskItemProps> = ({task, onToggleTaskCompleted, onClickDeleteTask}) => {
    const statusText = task.completed ? "完了済み" : "未完了";
    const statusClass = task.completed ? "status-completed" : "status-pending";
    return (
        <div className='task-item'>
            <li className={task.completed ? 'completed' : ''}>       
                <button
                    className={statusClass}
                    onClick={() => onToggleTaskCompleted(task)}
                    aria-label={task.completed ? "タスクを未完了に戻す" : "タスクを完了にする"}
                >
                    {statusText}
                </button>
                <span className='task-title'>{task.title}</span>
                <button onClick={() => onClickDeleteTask(task.id)} className='delete-button'>削除</button>
            </li>
        </div>
    )
}

export default TaskItem;
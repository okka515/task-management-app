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
    return (
        <div>
            <li>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTaskCompleted(task)}
                />
                <span>{task.title}</span>
                <button onClick={() => onClickDeleteTask(task.id)}>削除</button>
            </li>
        </div>
    )
}

export default TaskItem;
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
    tasks: Task[];
    onToggleTaskCompleted: (task: Task) => void;
    onClickDeleteTask: (id: number) => void;
}


const TaskItemList: React.FC<TaskListProps> = ({tasks, onToggleTaskCompleted, onClickDeleteTask}) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTaskCompleted={onToggleTaskCompleted}
                    onClickDeleteTask={onClickDeleteTask}
                />
            ))}
        </div>
    )
}

export default TaskItemList
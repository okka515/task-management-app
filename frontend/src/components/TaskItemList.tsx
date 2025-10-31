import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
    tasks: Task[];
    onToggleTaskCompleted: (task: Task) => void;
    onClickDeleteTask: (id: number) => void;
}

const TaskItemList: React.FC<TaskListProps> = ({tasks, onToggleTaskCompleted, onClickDeleteTask}: TaskListProps) => {
    return (
        <li className='task-list'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTaskCompleted={onToggleTaskCompleted}
                    onClickDeleteTask={onClickDeleteTask}
                />
            ))}
        </li> 
    )
}

export default TaskItemList
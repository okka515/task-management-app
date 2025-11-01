import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
    tasks: Task[];
    onToggleTaskCompleted: (task: Task) => Promise<boolean>;
    onClickDeleteTask: (id: number) => Promise<boolean>;
}

const TaskItemList: React.FC<TaskListProps> = ({tasks, onToggleTaskCompleted, onClickDeleteTask}: TaskListProps) => {
    return (
        <ul className='task-list'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTaskCompleted={onToggleTaskCompleted}
                    onClickDeleteTask={onClickDeleteTask}
                />
            ))}
        </ul> 
    )
}

export default TaskItemList
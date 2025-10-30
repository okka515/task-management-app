import './App.css';
import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskItemList from './components/TaskItemList';
import AddTaskForm from './components/AddTaskForm';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  const { tasks, onCreateTask, toggleTaskCompleted, deleteTask } = useTasks();

  return (
    <div>
      <AddTaskForm onCreateTask={onCreateTask} />
      <TaskItemList 
        tasks={tasks}
        onToggleTaskCompleted={toggleTaskCompleted}
        onClickDeleteTask={deleteTask}  
        />
    </div>
  );
}

export default App;

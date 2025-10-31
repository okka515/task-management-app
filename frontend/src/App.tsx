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
  const { tasks, onCreateTask, onToggleTaskCompleted, deleteTask } = useTasks();

  return (
    <div className='App'>
      <h1>Task Management App</h1>
      <AddTaskForm onCreateTask={onCreateTask} />
      <TaskItemList 
        tasks={tasks}
        onToggleTaskCompleted={onToggleTaskCompleted}
        onClickDeleteTask={deleteTask}  
        />
    </div>
  );
}

export default App;

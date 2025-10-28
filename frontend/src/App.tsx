import './App.css';
import AddTaskForm from './components/AddTaskForm';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  return (
    <div>
      <AddTaskForm />
    </div>
  );
}

export default App;

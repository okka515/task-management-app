import React from 'react';

interface AddTaskFormProps {
    onCreateTask: (title: string) => Promise<boolean> ;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({onCreateTask}) => {

    const [taskTitle, setTaskTitle] = React.useState<string>("");

    // タスク入力フォームが変更された時の処理
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTaskTitle(e.target.value);
    }

    // タスク追加ボタンが押された時の処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskTitle.trim() === "") {
            return;
        }
        const success: boolean = await onCreateTask(taskTitle);
        if (success) {
            setTaskTitle("");
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='task-form'>
                <input
                type="text"
                value={taskTitle}
                placeholder="追加するタスクを入力してください"
                onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">追加</button>
            </form>
            
        </div>
    )
}

export default AddTaskForm
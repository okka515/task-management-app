import React from 'react';

const AddTaskForm: React.FC = () => {

    const [taskTitle, setTaskTitle] = React.useState<string>("");

    // タスク入力フォームが変更された時の処理
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        e.preventDefault();
        setTaskTitle(e.target.value);
    }

    // タスク追加ボタンが押された時の処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTaskTitle("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
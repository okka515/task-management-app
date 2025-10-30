from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional


# タスク作成時に受け取るデータ
class TaskCreateRequest(BaseModel):
    title: str = Field(..., min_length=1, description="タスク内容")

# タスクデータベース
class Task(BaseModel):
    id: int
    title: str
    completed: bool = False

# メモリ内データベース
db: List[Task] = []
task_id_counter = 0

# FastAPIアプリケーションの初期化
app = FastAPI()

# CORSミドルウェアの設定
originns = [
    "http://localhost:3000",
    "http://127.0.0.1:8000" 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=originns,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# タスクを探す関数
def find_task(task_id: int) -> Task:
    for task in db:
        if task.id == task_id:
            return task
    return None


# 以下APIエンドポイントの作成
# 最初の動作
@app.get("/")
def read_root():
    return{"message": "Hello, World!"}

# タスク一覧の取得
@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return db

# タスクの作成
@app.post("/tasks", response_model=Task, status_code=201)
def create_task(task_request: TaskCreateRequest):
    global task_id_counter
    task_id_counter += 1
    new_task = Task(id=task_id_counter, title=task_request.title, completed=False)
    db.append(new_task)
    return new_task

# タスクの完了状態の更新
@app.patch("/tasks/{task_id}/complete", response_model=Task)
def complete_task(task_id: int):
    task = find_task(task_id)
    if task is None:
        return ("タスクが見つかりません")
    else:
        task.completed = not task.completed
    return task

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    task = find_task(task_id)
    if task is None:
        return ("タスクが見つかりません")
    else:
        db.remove(task)
    return
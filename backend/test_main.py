import pytest
from fastapi.testclient import TestClient
from main import app 
import main # モジュール自体をインポートして、グローバル変数をリセットする

# テスト用擬似クライアント
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_function():
    """
    各テストの実行前に、mainモジュール自体のグローバル変数をリセットする
    """
    main.db.clear()
    main.task_id_counter = 0
    yield

# --- テスト関数 ---

def test_read_root():
    """ [GET /] ルートパスのテスト """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}

def test_create_task():
    """ [POST /tasks] タスク作成のテスト """
    # タスク作成のリクエストを送信
    response = client.post("/tasks", json={"title": "Test Task"})
    assert response.status_code == 201
    
    # 帰ってきたJSONデータの検証
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["completed"] == False
    assert data["id"] == 1

    # メモリデータベースの内容を「API経由で」確認
    response = client.get("/tasks")
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Task"

def test_get_tasks():
    """ [GET /tasks] タスク一覧取得のテスト """
    # 事前にタスクを追加
    client.post("/tasks", json={"title": "Task 1"})
    client.post("/tasks", json={"title": "Task 2"})

    # タスク一覧取得のテスト
    response = client.get("/tasks")
    assert response.status_code == 200

    # 帰ってきたJSONデータの検証
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"
    assert data[0]["id"] == 1
    assert data[1]["id"] == 2

def test_complete_task():
    """ [PATCH /tasks/{id}] タスク完了切り替えのテスト """
    # 事前にタスクを追加
    post_res = client.post("/tasks", json={"title": "Incomplete Task"})
    task_id = post_res.json()["id"]

    # タスク完了のテスト
    response = client.patch(f"/tasks/{task_id}")
    assert response.status_code == 200

    # 帰ってきたJSONデータの検証
    data = response.json()
    assert data["id"] == task_id
    assert data["completed"] == True

    # メモリデータベースの内容を「API経由で」確認
    response = client.get("/tasks")
    data = response.json()
    assert len(data) == 1
    assert data[0]["completed"] == True

def test_delete_task():
    """ [DELETE /tasks/{id}] タスク削除のテスト """
    # 事前にタスクを追加
    post_res = client.post("/tasks", json={"title": "Task to be deleted"})
    task_id = post_res.json()["id"]

    # API経由でDBに1件あることを確認
    response = client.get("/tasks")
    assert len(response.json()) == 1

    # タスク削除のテスト
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 204

    # API経由でDBが空になったことを確認
    response = client.get("/tasks")
    assert len(response.json()) == 0
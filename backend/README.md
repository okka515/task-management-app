## バックエンド (FastAPI)

### 1. 依存パッケージのインストール

1.  プロジェクトのルートディレクトリ (`task-management-app/`) で、仮想環境を有効化
    ```bash
    source ../.venv/bin/activate 
    # もしルートディレクトリで実行する場合は source .venv/bin/activate
    ```

2.  `backend` ディレクトリ内で、依存パッケージをインストール
    ```bash
    pip install -r requirements.txt
    ```

### 2. アプリケーションの起動

1.  仮想環境が有効化されており、`backend` ディレクトリにいることを確認
2.  以下のコマンドを実行
    ```bash
    uvicorn main:app --reload
    ```
サーバーは `http://127.0.0.1:8000` で起動
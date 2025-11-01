## セットアップ & 実行方法

詳細なセットアップと実行方法は、`frontend` と `backend` の各ディレクトリ内にある `README.md` を参照

### 1. バックエンド (FastAPI)

1.  `backend/README.md` の手順に従い、仮想環境の有効化と `pip install` を実行
2.  以下のコマンドでサーバーを起動
    ```bash
    # (backend ディレクトリで実行)
    uvicorn main:app --reload
    ```

### 2. フロントエンド (React)

1.  `frontend/README.md` の手順に従い、`npm install` を実行
2.  以下のコマンドで開発サーバーを起動
    ```bash
    # (frontend ディレクトリで実行)
    npm start
    ```
3.  ブラウザで `http://localhost:3000` が自動的に開く

## 主な機能

### 必須要件
* タスクの一覧表示
* タスクの新規作成
* タスクの削除
* タスクの完了/未完了の切り替え

### 実装済みの加点要素
* **TypeScriptの使用:**
* **エラーハンドリング:** 
* **バリデーション:** 
* **テストコードの追加:** 
* **レスポンシブデザイン:**
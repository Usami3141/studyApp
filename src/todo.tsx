import { useState } from "react";
import { useEffect } from "react";
import style from "./App.module.css";
import { Routes, Route, Link } from "react-router-dom";
import App from "./App";

const Todo = () => {
  //Todoアイテムの型定義
  type Todo = {
    id: number;
    text: string;
    done: boolean;
    createdAt: Date;
  };

  //localstrageから保存済みのデータがあれば取得
  const loadTodos = (): Todo[] => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        return JSON.parse(stored).map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  };

  //状態とset関数の宣言
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [text, setText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "done" | "undone">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  //レンダリング時にしてほしい処理
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //内部関数コンポーネント
  //Todoアイテム追加
  const handleTodoAdd = () => {
    const todo: Todo = {
      id: Date.now(),
      text: text,
      done: false,
      createdAt: new Date(),
    };

    if (inputValidation(todo.text)) {
      setTodos([...todos, todo]);
      setText("");
    }
  };

  //Todoアイテム削除
  const handleTodoDelete = (id: number) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  //Todoアイテムのステータス変更
  const handleTodoDone = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };

  //Todoアイテムの編集モード切替
  const editingTodo = (id: number) => {
    const target: Todo | undefined = todos.find((todo) => todo.id === id);
    if (target) {
      setEditingId(id);
      setEditingText(target.text);
    }
  };

  //Todoアイテムの編集保存
  const confirmEdit = (id: number) => {
    if (inputValidation(editingText)) {
      const updatedTodos = todos.map((t) =>
        t.id === id ? { ...t, text: editingText } : t
      );
      setTodos(updatedTodos);
      setEditingText("");
      setEditingId(null);
    }
  };

  //Todoアイテムの入力バリデーション
  const inputValidation = (text: string) => {
    if (text.trim() === "") {
      setErrorText("有効な内容を入力してください");
      return false;
    } else {
      setErrorText("");
      return true;
    }
  };

  //Todoアイテムリストのフィルター機能
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "undone") return !todo.done;
    return true;
  });

  //描画内容記述
  return (
    <div className={style.wrapper}>
      <Routes>{/* 他のルートがあればここに追加 */}</Routes>
      <div className={style.body}>
        <div className={style.container}>
          <h2>Todoリスト</h2>

          <div className={style.inputGroup}>
            {/* アイテム追加input */}
            {/* 入力内容が知りたいのでonChangeでイベントオブジェクトを引数としている */}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleTodoAdd}>登録</button>
          </div>
          {errorText && <p className={style.errorText}>{errorText}</p>}

          {/* フィルター機能 */}
          <p>
            <button onClick={() => setFilter("all")}>すべて</button>
            <button onClick={() => setFilter("undone")}>未完了</button>
            <button onClick={() => setFilter("done")}>完了</button>
          </p>

          {/* アイテムリスト表示 */}
          <ul>
            {
              //配列としてリストを管理しているので繰り返し処理で表示
              filteredTodos.map((todo) => (
                <li key={todo.id} className={style.todoItem}>
                  {/* 編集中のアイテムは入力ボックスに表示切替 */}
                  {editingId === todo.id ? (
                    <>
                      {/* 編集中 */}
                      {/* 入力内容が知りたいのでonChangeでイベントオブジェクトを引数としている */}
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button onClick={() => confirmEdit(todo.id)}>保存</button>
                    </>
                  ) : (
                    <>
                      {/* こちらのonChangeではイベントオブジェクトを引数としていない。入力されたかどうかだけ分かればよいため*/}
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleTodoDone(todo.id)}
                      />
                      <span
                        style={{
                          textDecoration: todo.done ? "line-through" : "none",
                        }}
                        className={`${style.todoText} ${
                          todo.done ? style.done : ""
                        }`}
                      >
                        {todo.createdAt.toLocaleString()} {todo.text}
                      </span>
                      <button onClick={() => editingTodo(todo.id)}>編集</button>
                    </>
                  )}
                  {/* アイテムの削除ボタン */}
                  <button onClick={() => handleTodoDelete(todo.id)}>
                    削除
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

//モジュール化
export default Todo;

import {useState, useEffect} from "react";
import type { Todo } from "../types/TodoTypes";
import loadTodos from "../utils/loadTodos";


const useTodo = () => {
  //状態とset関数の宣言
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<"all" | "done" | "undone">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [todoError, setTodoError] = useState<string>("");

    //レンダリング時にしてほしい処理
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

    //内部関数コンポーネント
  //Todoアイテム追加
  const handleTodoAdd = () => {
    const todo: Todo = {
      id: Date.now(),
      text: inputTodo,
      done: false,
      createdAt: new Date(),
    };

    if (inputValidation(todo.text)) {
      setTodos([...todos, todo]);
      setInputTodo("");
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
  const handleEditingTodo = (id: number) => {
    const target: Todo | undefined = todos.find((todo) => todo.id === id);
    if (target) {
      setEditingId(id);
      setEditingText(target.text);
    }
  };

  //Todoアイテムの編集保存
  const handleConfirmEdit = (id: number) => {
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
      setTodoError("有効な内容を入力してください");
      return false;
    } else {
      setTodoError("");
      return true;
    }
  };

  //フィルターされたTodoアイテムリスト
  const filteredTodos = todos.filter((todo) => {
    switch(todoFilter) {
      case "all":
        return true;
      case "done":
        return todo.done;
      case "undone":
        return !todo.done;
    }
  });

  return {
    inputTodo,
    filteredTodos,
    editingId,
    editingText,
    todoError,
    setInputTodo,
    setTodoFilter,
    setEditingText,
    handleTodoAdd,
    handleTodoDelete,
    handleTodoDone,
    handleEditingTodo,
    handleConfirmEdit,
  };
};

export default useTodo;
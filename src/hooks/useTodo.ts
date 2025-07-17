import * as yup from "yup";
import {useState, useEffect} from "react";
import type { Todo } from "../types/TodoTypes";
import loadTodos from "../utils/loadTodos";
import todoSchema from "../schemas/todoSchema";

const useTodo = () => {
  //状態とset関数の宣言
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<"all" | "done" | "undone">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [todoError, setTodoError] = useState<string[]>([]);

    //レンダリング時にしてほしい処理
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

    //内部関数コンポーネント
  //Todoアイテム追加
  const handleTodoAdd = async () => {
    const todo: Todo = {
      id: Date.now(),
      text: inputTodo,
      done: false,
      createdAt: new Date(),
    };

    const isValid = await todoValidation(todo.text);

    if (isValid) {
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
  const handleConfirmEdit = async (id: number) => {
    const isValid = await todoValidation(editingText);
    if (isValid) {
      const updatedTodos = todos.map((t) =>
        t.id === id ? { ...t, text: editingText } : t
      );
      setTodos(updatedTodos);
      setEditingText("");
      setEditingId(null);
    }
  };

  //Todoアイテムの入力バリデーション
  const todoValidation = async(todoText: string): Promise<boolean> => {
    try {
      await todoSchema.validate({ todoText }, { abortEarly: false });
      setTodoError([]);
      return true;
    }catch(error){
      if(error instanceof yup.ValidationError){
        setTodoError(error.errors);
      }else{
        setTodoError(["不明なエラーです。"]);
      }
      return false;
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
import * as yup from "yup";
import { useState, useEffect } from "react";
import type { Todo } from "../types/TodoTypes";
import fetchTodos from "../utils/fetchTodos";
import addTodo from "../utils/addTodo";
import todoSchema from "../schemas/todoSchema";

const useTodo = (userId: string | null) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoFilter, setTodoFilter] = useState<"all" | "done" | "undone">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [todoError, setTodoError] = useState<string[]>([]);

  // userIdが変わったらTodoを取得する
  useEffect(() => {
    if (!userId) {
      setTodos([]); // userId無しなら空にするなど
      return;
    }
    const init = async () => {
      const loadedTodos = await fetchTodos(userId);
      setTodos(loadedTodos);
    };
    init();
  }, [userId]);

  const handleTodoAdd = async () => {
    if (!userId) {
      console.warn("userIdが未設定なのでTodo追加不可");
      return;
    }

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
      try {
        await addTodo(inputTodo, userId);
      } catch (e) {
        console.error("追加処理でエラー:", e);
      }
    }
  };

  // 以下は元のコードのまま（省略可能）

  const handleTodoDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleTodoDone = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const handleEditingTodo = (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (target) {
      setEditingId(id);
      setEditingText(target.text);
    }
  };

  const handleConfirmEdit = async (id: number) => {
    const isValid = await todoValidation(editingText);
    if (isValid) {
      setTodos(todos.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
      setEditingText("");
      setEditingId(null);
    }
  };

  const todoValidation = async (todoText: string): Promise<boolean> => {
    try {
      await todoSchema.validate({ todoText }, { abortEarly: false });
      setTodoError([]);
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setTodoError(error.errors);
      } else {
        setTodoError(["不明なエラーです。"]);
      }
      return false;
    }
  };

  const filteredTodos = todos.filter((todo) => {
    switch (todoFilter) {
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

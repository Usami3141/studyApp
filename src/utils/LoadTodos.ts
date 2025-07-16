import type { Todo } from "../types/TodoTypes";

//localstrageから保存済みのデータがあれば取得
const loadTodos = (): Todo[] => {
  const stored = localStorage.getItem("todos");
  if (stored) {
    try {
      return JSON.parse(stored).map((todo: Todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    } catch (e) {
      console.error("Failed to load todos from localStorage:", e);
    }
  }
  return [];
};

export default loadTodos;

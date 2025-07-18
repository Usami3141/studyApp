import supabase from "../lib/supabase";
import type { Todo } from "../types/TodoTypes";

/**
 * 指定された userId に紐づく Todo を取得する
 */
const fetchTodos = async (userId: string): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Todoの取得エラー:", error.message);
    return [];
  }

  return data as Todo[];
};

export default fetchTodos;

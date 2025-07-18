import supabase from "../lib/supabase";

const addTodo = async (text: string, userId: string) => {
  const { data, error } = await supabase
    .from('todo')
    .insert({ text, done: false, user_id: userId });

  if (error) {
      console.error(`Todo追加エラー: text="${text}", userId="${userId}"`, error.message);
    return null;
  }
  return data;
};

export default addTodo;
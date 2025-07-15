import style from "../App.module.css";
import type { Todo } from "../types/TodoTypes";

type Props = {
    filteredTodos: Todo[];
    editingId: number | null;
    editingText: string;
    setEditingText: (value: string) => void;
    handleTodoDone: (id: number) => void;
    handleTodoDelete: (id: number) => void;
    editingTodo: (id: number) => void;
    confirmEdit: (id: number) => void;
}

const TodoList: React.FC<Props> = (
    {
        filteredTodos,
        editingId,
        editingText,
        setEditingText,
        handleTodoDone,
        handleTodoDelete,
        editingTodo,
        confirmEdit,
    }
) => {
    return (
          <ul>
            {/* アイテムリスト表示 */}
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
    );
}

export default TodoList;
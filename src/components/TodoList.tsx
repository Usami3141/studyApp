import style from "../App.module.css";
import Button from "../components/common/Button";
import Input from "./common/Input";
import Checkbox from "./common/Checkbox";
import type { Todo } from "../types/TodoTypes";

type TodoListProps = {
  filteredTodos: Todo[];
  editingId: number | null;
  editingText: string;
  setEditingText: (value: string) => void;
  handleTodoDone: (id: number) => void;
  handleTodoDelete: (id: number) => void;
  handleEditingTodo: (id: number) => void;
  handleConfirmEdit: (id: number) => void;
};

const TodoList = ({
  filteredTodos,
  editingId,
  editingText,
  setEditingText,
  handleTodoDone,
  handleTodoDelete,
  handleEditingTodo,
  handleConfirmEdit,
}: TodoListProps) => {
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
                <Input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <Button onClick={() => handleConfirmEdit(todo.id)}>保存</Button>
              </>
            ) : (
              <>
                {/* こちらのonChangeではイベントオブジェクトを引数としていない。入力されたかどうかだけ分かればよいため*/}
                <Checkbox
                  checked={todo.done}
                  onChange={() => handleTodoDone(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  className={`${style.todoText} ${todo.done ? style.done : ""}`}
                >
                  {todo.createdAt.toLocaleString()} {todo.text}
                </span>
                <Button onClick={() => handleEditingTodo(todo.id)}>編集</Button>
              </>
            )}
            {/* アイテムの削除ボタン */}
            <Button onClick={() => handleTodoDelete(todo.id)}>削除</Button>
          </li>
        ))
      }
    </ul>
  );
};

export default TodoList;

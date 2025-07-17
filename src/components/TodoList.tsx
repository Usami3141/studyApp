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
    <div className={style.todoListWrapper}>
      <ul className={style.todoList}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={style.todoItem}>
            {editingId === todo.id ? (
              <>
                <div className={style.contentArea}>
                  <Checkbox checked={todo.done} onChange={() => {}} disabled />
                  <Input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </div>
                <div className={style.buttonArea}>
                  <Button onClick={() => handleConfirmEdit(todo.id)}>
                    保存
                  </Button>
                  <Button onClick={() => handleTodoDelete(todo.id)}>
                    削除
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={style.contentArea}
                  onClick={() => handleTodoDone(todo.id)}
                >
                  <Checkbox checked={todo.done} onChange={() => {}} />
                  <span
                    className={`${style.todoText} ${
                      todo.done ? style.done : ""
                    }`}
                    style={{
                      textDecoration: todo.done ? "line-through" : "none",
                    }}
                  >
                    {todo.createdAt.toLocaleString()} {todo.text}
                  </span>
                </div>
                <div className={style.buttonArea}>
                  <Button onClick={() => handleEditingTodo(todo.id)}>
                    編集
                  </Button>
                  <Button onClick={() => handleTodoDelete(todo.id)}>
                    削除
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import style from "../App.module.css";
import Button from "./common/Button";
import Input from "./common/Input";

type TodoFormProps = {
  inputTodo: string;
  setInputTodo: (value: string) => void;
  handleTodoAdd: () => void;
};

const TodoForm = ({
  inputTodo,
  setInputTodo,
  handleTodoAdd,
}: TodoFormProps) => {
  return (
    <div className={style.inputGroup}>
      {/* アイテム追加input */}
      {/* 入力内容が知りたいのでonChangeでイベントオブジェクトを引数としている */}
      <Input
        type="text"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
      />
      <Button onClick={handleTodoAdd}>登録</Button>
    </div>
  );
};

export default TodoForm;

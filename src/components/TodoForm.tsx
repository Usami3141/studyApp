import style from "../App.module.css";
import Button from "./common/Button";
import Input from "./common/Input";

type TodoFormProps = {
  inputTodo: string;
  setInputTodo: (value: string) => void;
  handleTodoAdd: () => void;
  disabled?: boolean;
};

const TodoForm = ({
  inputTodo,
  setInputTodo,
  handleTodoAdd,
  disabled,
}: TodoFormProps) => {
  return (
    <div className={style.inputGroup}>
      {/* アイテム追加input */}
      {/* 入力内容が知りたいのでonChangeでイベントオブジェクトを引数としている */}
      <Input
        type="text"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
        disabled={disabled} 
      />
      <Button onClick={handleTodoAdd}>登録</Button>
    </div>
  );
};

export default TodoForm;

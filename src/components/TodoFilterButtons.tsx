import Button from "./common/Button";

type TodoFilterButtonsProps = {
  setTodoFilter: (filterTodo: "all" | "undone" | "done") => void;
};

const TodoFilterButtons = ({ setTodoFilter }: TodoFilterButtonsProps) => {
  return (
    <p>
      {/* フィルター機能 */}
      <Button onClick={() => setTodoFilter("all")}>すべて</Button>
      <Button onClick={() => setTodoFilter("undone")}>未完了</Button>
      <Button onClick={() => setTodoFilter("done")}>完了</Button>
    </p>
  );
};

export default TodoFilterButtons;

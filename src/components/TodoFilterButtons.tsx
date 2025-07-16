import Button from "./common/Button";

type Props = {
    setTodoFilter:(filterTodo : "all" | "undone" | "done") => void
};

const TodoFilterButtons: React.FC<Props> = ({
    setTodoFilter,
}) => {
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
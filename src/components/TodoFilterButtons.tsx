

type Props = {
    setTodoFilter:(filterTodo : "all" | "undone" | "done") => void
};

const TodoFilterButtons: React.FC<Props> = ({
    setTodoFilter,
}) => {
  return (
    <p>
      {/* フィルター機能 */}
      <button onClick={() => setTodoFilter("all")}>すべて</button>
      <button onClick={() => setTodoFilter("undone")}>未完了</button>
      <button onClick={() => setTodoFilter("done")}>完了</button>
    </p>
  );
};

export default TodoFilterButtons;
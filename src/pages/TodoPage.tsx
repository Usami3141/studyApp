import style from "../App.module.css";
import { Routes, Link } from "react-router-dom";
import useTodo from "../hooks/useTodo";
import TodoForm from "../components/TodoForm";
import TodoFilterButtons from "../components/TodoFilterButtons";
import TodoList from "../components/TodoList";

const TodoPage = () => {

 const {
    inputTodo,
    filteredTodos,
    editingId,
    editingText,
    todoError,
    setInputTodo,
    setTodoFilter,
    setEditingText,
    handleTodoAdd,
    handleTodoDelete,
    handleTodoDone,
    editingTodo,
    confirmEdit,
  } = useTodo();


  //描画内容記述
  return (
    <div className={style.wrapper}>
      <Routes>{/* 他のルートがあればここに追加 */}</Routes>
      <div className={style.body}>
        <div className={style.container}>
          <h2>Todoリスト</h2>
          <TodoForm
            inputTodo={inputTodo}
            setInputTodo={setInputTodo}
            handleTodoAdd={handleTodoAdd}
          />
          {todoError && <p className={style.errorText}>{todoError}</p>}

          <TodoFilterButtons setTodoFilter={setTodoFilter} />
          <p className={style.todoCount}>{filteredTodos.length}件</p>

        <TodoList
            filteredTodos={filteredTodos}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            handleTodoDone={handleTodoDone}
            handleTodoDelete={handleTodoDelete}
            editingTodo={editingTodo}
            confirmEdit={confirmEdit}
          />
        </div>
        <br />
        <Link to="/">ホームに戻る</Link>
      </div>
    </div>
  );
};

//モジュール化
export default TodoPage;

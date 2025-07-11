import { Routes, Route, Link } from "react-router-dom";
import style from "./App.module.css";
import Game from "./Game";
import Todo from "./todo";
import NoMatch from "./NoMatch";

function App() {
  return (
    <div className={style.wrapper}>
      {/* 共通レイアウト */}
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">ゲーム</Link>
        <br />
        <Link to="/todo">Todo</Link>
      </nav>
      {/* ルーティング設定 */}
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;

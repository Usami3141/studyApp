import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import style from "./App.module.css";
import Game from "./Game";
import Todo from "./todo";
import NoMatch from "./NoMatch";

function App() {

  const visitedCount = () => {
    const visitedcount = Number(localStorage.getItem("count"));
    if (!isNaN(visitedcount) && visitedcount > 0) {
      return visitedcount;
    }
    return 0;
  }

  // 初期状態の設定
  const [count, setCount] = useState<number>(visitedCount());
  const location = useLocation();

  // useEffectを使ってコンポーネントがマウントされたときにカウントを増やす
  useEffect(() => setCount(prevCount => prevCount! + 1), []);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <div className={style.wrapper}>
      {/* 共通レイアウト */}
      <nav style={{ marginBottom: "1rem" }}>
        { location.pathname !== "/game" && <Link to="/game">ゲーム</Link>}
        <br />
        { location.pathname !== "/todo" && <Link to="/todo">Todo</Link>}
      </nav>
      {/* ルーティング設定 */}
      <Routes>
        <Route path="/" element={
          <div className={style.body}>
            <h2>ホーム画面</h2>
            <h2>あなたはこの画面を{count}回訪れました</h2>
          </div>
      } />
        <Route path="/game" element={<Game />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;

import style from "./App.module.css";
import RoutesComponent from "./router/RoutesComponent";
import useHome from "./hooks/useHome";

function App() {
  const { count, location } = useHome();

  return (
    <div className={style.wrapper}>
      {/* ルーティング設定 */}
      <RoutesComponent 
      count={count}
      location={location} />
    </div>
  );
}

export default App;

import style from "../App.module.css";

type HomePageProps = {
  count: number;
};

const HomePage = ({ count }: HomePageProps) => (
  <div className={style.body}>
    <h2>ホーム画面</h2>
    <h2>あなたはこの画面を{count}回訪れました</h2>
  </div>
);
export default HomePage;

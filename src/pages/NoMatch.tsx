import {Link} from 'react-router-dom';
import style from "../App.module.css";

const NoMatch = () => {
  return (
    <div className={style.body}>
      <h2 className={style.h2}>このページは存在しません。</h2>
      <p>URLを確認するか、ホームに戻ってください。</p>
      <Link to="/">ホームに戻る</Link>
    </div>
  );
}

export default NoMatch;
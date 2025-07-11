import {Link} from 'react-router-dom';

const NoMatch = () => {
  return (
    <>
      <h2>このページは存在しません。</h2>
      <p>URLを確認するか、ホームに戻ってください。</p>
      <Link to="/">ホームに戻る</Link>
    </>
  );
}

export default NoMatch;
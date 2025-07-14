import { Link } from "react-router-dom";
import style from "../App.module.css";
import useGame from "../hooks/useGame";
import PlayerNameForm from "../components/PlayerNameForm";
import ErrorMessages from "../components/ErrorMessages";
import GameStatus from "../components/GameStatus";
import GameBoard from "../components/GameBoard";

const Game = () => {
  const {
    name1,
    name2,
    player2,
    player,
    squares,
    victory,
    reset,
    vsCPU,
    errorName,
    setName1,
    setName2,
    putPiece,
    handleName,
    handleReset,
    handleCPU,
  } = useGame();

  return (
    <div className = {style.wrapper}>
      <div className = {style.body}>
        <h2 className = {style.h2}>三目並べゲーム</h2>
        <PlayerNameForm 
          name1 = {name1}
          name2 = {name2}
          setName1 = {setName1}
          setName2 = {setName2}
          vsCPU = {vsCPU}
          handleName = {handleName}
        />
        <ErrorMessages 
          errorName = {errorName}
        />
        <GameStatus
          player={player}
          player2={player2}
          victory={victory}
          vsCPU={vsCPU}
        />
        <GameBoard
          squares={squares}
          putPiece={putPiece}
        />
        {/* CPUモードのON/OFFボタン */}
        <button className={style.button} onClick={handleCPU}>
          CPUモード
        </button>
        {/* リセットボタンの実装 */}
        <button className={style.button} onClick={handleReset}>
          リセット
        </button>
        {/* リセットボタンを押してから、対局が始まるまで表示される */}
        {reset && <p>リセットされました！</p>}
        <br />
        <Link to="/">ホームに戻る</Link>
      </div>
    </div>
  );
};

export default Game;

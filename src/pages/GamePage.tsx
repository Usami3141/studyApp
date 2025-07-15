import { Link } from "react-router-dom";
import style from "../App.module.css";
import useGame from "../hooks/useGame";
import PlayerNameForm from "../components/PlayerNameForm";
import ErrorMessages from "../components/ErrorMessages";
import GameStatus from "../components/GameStatus";
import GameBoard from "../components/GameBoard";

const GamePage = () => {
  const {
    firstPlayer,
    secondPlayer,
    currentTurn,
    boardSquares,
    victory,
    reset,
    vsCPU,
    nameError,
    setFirstPlayer,
    setSecondPlayer,
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
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
          setFirstPlayer={setFirstPlayer}
          setSecondPlayer={setSecondPlayer}
          vsCPU={vsCPU}
          handleName={handleName}
        />
        <ErrorMessages 
          nameError={nameError}
        />
        <GameStatus
          currentTurn={currentTurn}
          secondPlayer={secondPlayer}
          victory={victory}
          vsCPU={vsCPU}
        />
        <GameBoard
          boardSquares={boardSquares}
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

export default GamePage;

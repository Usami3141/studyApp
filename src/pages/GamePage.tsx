import { Link } from "react-router-dom";
import style from "../App.module.css";
import useGame from "../hooks/useGame";
import PlayerNameForm from "../components/PlayerNameForm";
import ErrorMessages from "../components/ErrorMessages";
import GameStatus from "../components/GameStatus";
import GameBoard from "../components/GameBoard";
import Button from "../components/common/Button";

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
    <div className={style.body}>
      <h2 className={style.h2}>三目並べゲーム</h2>
      <PlayerNameForm
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        setFirstPlayer={setFirstPlayer}
        setSecondPlayer={setSecondPlayer}
        vsCPU={vsCPU}
        handleName={handleName}
      />
      <ErrorMessages nameError={nameError} />
      <GameStatus
        currentTurn={currentTurn}
        secondPlayer={secondPlayer}
        victory={victory}
        vsCPU={vsCPU}
      />
      <GameBoard boardSquares={boardSquares} putPiece={putPiece} />
      {/* CPUモードのON/OFFボタン */}
      <Button onClick={handleCPU}>CPUモード</Button>
      {/* リセットボタンの実装 */}
      <Button onClick={handleReset}>リセット</Button>
      {/* リセットボタンを押してから、対局が始まるまで表示される */}
      {reset && <p>リセットされました！</p>}
      <br />
      <Link to="/">ホームに戻る</Link>
    </div>
  );
};

export default GamePage;

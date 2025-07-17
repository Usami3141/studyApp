import type {Square} from "../types/GameTypes";
import style from "../App.module.css";
import Button from "./common/Button";

type GameBoardProps = {
    boardSquares: Square[];
    putPiece: (id: number, isPlayer: boolean) => void;
}

const GameBoard = ({ boardSquares, putPiece }: GameBoardProps) => {
    return (
        <div className={style.board}>
          {boardSquares.map((square) => (
            <Button
              className={style.piece}
              key={square.id}
              onClick={() => putPiece(square.id, true)}
            >
              {square.state}
            </Button>
          ))}
        </div>
    );
};

export default GameBoard;
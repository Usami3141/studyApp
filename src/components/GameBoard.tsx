import type {Square} from "../types/GameTypes";
import style from "../App.module.css";
import Button from "./common/Button";

type Props = {
    boardSquares: Square[];
    putPiece: (id: number, isPlayer: boolean) => void;
}

const GameBoard: React.FC<Props> = ({ boardSquares, putPiece }) => {
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
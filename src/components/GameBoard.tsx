import type {Square} from "../types/types";
import style from "../App.module.css";

type Props = {
    squares: Square[];
    putPiece: (id: number, isPlayer: boolean) => void;
}

const GameBoard: React.FC<Props> = ({ squares, putPiece }) => {
    return (
        <div className={style.board}>
          {squares.map((square) => (
            <button
              className={style.piece}
              key={square.id}
              onClick={() => putPiece(square.id, true)}
            >
              {square.state}
            </button>
          ))}
        </div>
    );
};

export default GameBoard;
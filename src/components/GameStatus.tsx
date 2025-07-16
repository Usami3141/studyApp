import style from "../App.module.css";
import type { Player } from "../types/GameTypes";
import type { CurrentTurn } from "../types/GameTypes";

type GameStatusProps = {
  secondPlayer: Player;
  currentTurn: CurrentTurn;
  victory: string;
  vsCPU: boolean;
};

const GameStatus = ({
  currentTurn,
  secondPlayer,
  victory,
  vsCPU,
}: GameStatusProps) => {
  return (
    <>
      {victory === "" ? (
        <h3 className={style.h3}>
          {"現在のプレイヤー： "}
          {vsCPU
            ? currentTurn === secondPlayer.name
              ? "CPU"
              : currentTurn
            : currentTurn}
        </h3>
      ) : victory === "引き分け" ? (
        <p className={style.h2}>{victory}</p>
      ) : (
        <p className={style.h2}>勝者は {victory}</p>
      )}
    </>
  );
};

export default GameStatus;

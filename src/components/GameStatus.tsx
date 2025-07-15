import style from "../App.module.css";
import type { Player } from "../types/GameTypes";
import type { CurrentTurn } from "../types/GameTypes";

type Props = {
  secondPlayer: Player;
  currentTurn: CurrentTurn;
  victory: string;
  vsCPU: boolean;
};

const GameStatus: React.FC<Props> = ({ currentTurn, secondPlayer, victory, vsCPU }) => {
  return (
    <>
      {victory === "" ? (
        <p className={style.h2}>
          {"現在のプレイヤー： "}
          {vsCPU ? (currentTurn === secondPlayer.name ? "CPU" : currentTurn) : currentTurn}
        </p>
      ) : victory === "引き分け" ? (
        <p className={style.h2}>{victory}</p>
      ) : (
        <p className={style.h2}>勝者は {victory}</p>
      )}
    </>
  );
};

export default GameStatus;

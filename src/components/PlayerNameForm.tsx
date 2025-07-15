import style from "../App.module.css";
import type { Player } from "../types/GameTypes";

type Props = {
    firstPlayer: Player;
    secondPlayer: Player;
    setFirstPlayer: (player: Player) => void;
    setSecondPlayer: (player: Player) => void;
    vsCPU: boolean;
    handleName: () => void;
}

const PlayerNameForm: React.FC<Props> = ({
    firstPlayer,
    secondPlayer,
    setFirstPlayer,
    setSecondPlayer,
    vsCPU,
    handleName
}: Props) => {
  return (
    <p>
      <input placeholder = "プレイヤー1" value={firstPlayer.preName} onChange={(e) => setFirstPlayer({...firstPlayer, preName:e.target.value})} />：
      ○,
          {vsCPU ? (
            "CPU"
          ) : (
            <input placeholder = "プレイヤー2" value={secondPlayer.preName} onChange={(e) => setSecondPlayer({...secondPlayer, preName:e.target.value})} />
          )}
          ： ×
          <button className={style.button} onClick={() => handleName()}>
            名前セット
          </button>
        </p>
)}

export default PlayerNameForm;
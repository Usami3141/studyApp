import type { Player } from "../types/GameTypes";
import style from "../App.module.css";
import Button from "./common/Button";
import Input from "./common/Input";

type PlayerNameFormProps = {
  firstPlayer: Player;
  secondPlayer: Player;
  setFirstPlayer: (player: Player) => void;
  setSecondPlayer: (player: Player) => void;
  vsCPU: boolean;
  handleName: () => void;
};

const PlayerNameForm = ({
  firstPlayer,
  secondPlayer,
  setFirstPlayer,
  setSecondPlayer,
  vsCPU,
  handleName,
}: PlayerNameFormProps) => {
  return (
    <div className={style.form}>
      <div style={{ display: "flex" }}>
        <div className={style.inputGroup}>
          <Input
            placeholder="プレイヤー1"
            value={firstPlayer.preName}
            onChange={(e) =>
              setFirstPlayer({ ...firstPlayer, preName: e.target.value })
            }
          />
          <div>： ○ , </div>
        </div>
        <div className={style.inputGroup}>
          {vsCPU ? (
            "CPU"
          ) : (
            <Input
              placeholder="プレイヤー2"
              value={secondPlayer.preName}
              onChange={(e) =>
                setSecondPlayer({ ...secondPlayer, preName: e.target.value })
              }
            />
          )}
          <div>： ×</div>
        </div>
      </div>
      <div>
        <Button onClick={() => handleName()}>名前セット</Button>
      </div>
    </div>
  );
};

export default PlayerNameForm;

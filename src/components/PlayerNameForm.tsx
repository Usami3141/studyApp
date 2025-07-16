import type { Player } from "../types/GameTypes";
import Button from "./common/Button";
import Input from "./common/Input";

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
      <Input placeholder = "プレイヤー1" value={firstPlayer.preName} onChange={(e) => setFirstPlayer({...firstPlayer, preName:e.target.value})} />：
      ○,
          {vsCPU ? (
            "CPU"
          ) : (
            <Input placeholder = "プレイヤー2" value={secondPlayer.preName} onChange={(e) => setSecondPlayer({...secondPlayer, preName:e.target.value})} />
          )}
          ： ×
          <Button onClick={() => handleName()}>
            名前セット
          </Button>
        </p>
)}

export default PlayerNameForm;
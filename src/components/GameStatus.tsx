import style from "../App.module.css";

type Props = {
  player: string;
  player2: string;
  victory: string;
  vsCPU: boolean;
};

const Gamestatus: React.FC<Props> = ({ player, player2, victory, vsCPU }) => {
  return (
    <>
      {victory === "" ? (
        <p>
          現在のプレイヤー：{" "}
          {vsCPU ? (player === player2 ? "CPU" : player) : player}
        </p>
      ) : victory === "引き分け" ? (
        <p>{victory}</p>
      ) : (
        <p>勝者は {victory}</p>
      )}
    </>
  );
};

export default Gamestatus;

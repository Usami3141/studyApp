import style from "../App.module.css";

type Props = {
    name1: string;
    name2: string;
    setName1: (name: string) => void;
    setName2: (name: string) => void;
    vsCPU: boolean;
    handleName: () => void;
}

const PlayerNameForm: React.FC<Props> = ({
    name1,
    name2,
    setName1,
    setName2,
    vsCPU,
    handleName
}: Props) => {
  return (
    <p>
      <input placeholder = "プレイヤー1" value={name1} onChange={(e) => setName1(e.target.value)} />：
      ○,
          {vsCPU ? (
            "CPU"
          ) : (
            <input placeholder = "プレイヤー2" value={name2} onChange={(e) => setName2(e.target.value)} />
          )}
          ： ×
          <button className={style.button} onClick={() => handleName()}>
            名前セット
          </button>
        </p>
)}

export default PlayerNameForm;
import { useState, useEffect, useCallback } from "react";
import style from "./App.module.css";

//勝ちパターンの洗い出し
const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//正規表現チェック
const isValid = (text: string): boolean => {
  const regex =
    /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFFa-zA-Z0-9\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]*$/;
  return regex.test(text);
};

//勝利条件に一致するか確認する関数
const checkPiece = (result: Square[]) => {
  return lines.some((line) =>
    line.every((id) => result.some((r) => r.id === id))
  );
};

type Square = {
  id: number;
  state: "○" | "×" | "";
};

function App() {
  // 初期マス状態
  const initialSquares: Square[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    state: "",
  }));

  // 状態定義
  const [squares, setSquares] = useState<Square[]>(initialSquares);
  const [name1, setName1] = useState<string>("Player1");
  const [name2, setName2] = useState<string>("Player2");
  const [player1, setPlayer1] = useState<string>(name1);
  const [player2, setPlayer2] = useState<string>(name2);

  //Player1かPlayer2をランダムで返す
  const randomPlay = useCallback((): string => {
    return Math.random() < 0.5 ? player1 : player2;
  }, [player1, player2]);

  //初期値の都合上、randomPlayの宣言を状態定義の間に挟まないといけなかった
  const [player, setPlayer] = useState<string>(randomPlay());
  const [victory, setVictory] = useState<string | "引き分け" | "">("");
  const [reset, setReset] = useState<boolean>(false);
  const [vsCPU, setVsCPU] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<string[][]>([]);

  //プレイヤー名の入力チェック
  const nameValidation = (): boolean => {
    const errorName1: string[] = [];
    const errorName2: string[] = [];
    if (name1.trim() === "" || name1.trim().length > 10)
      errorName1.push("プレイヤー名は1~10文字にしてください。");
    if (!isValid(name1)) errorName1.push("特殊文字は使わないでください。");
    if (name2.trim() === "" || name2.trim().length > 10)
      errorName2.push("プレイヤー名は1~10文字にしてください。");
    if (!isValid(name2)) errorName2.push("特殊文字は使わないでください。");
    if (errorName1.length > 0 || errorName2.length > 0) {
      setErrorName([errorName1, errorName2]);
      return false;
    } else {
      setErrorName([]);
      return true;
    }
  };

  //プレイヤー名設定
  const handleName = () => {
    if (squares.some((s) => s.state !== "")) return;
    if (nameValidation()) {
      setPlayer1(name1);
      setPlayer2(name2);
    }
  };

  useEffect(() => {
    setPlayer(randomPlay());
  }, [randomPlay]);

  // 勝敗判定
  const checkVictory = useCallback(
    (player: string, newSquares: Square[]) => {
      const symbol = player === player1 ? "○" : "×";
      const playerSquares = newSquares.filter((s) => s.state === symbol);

      if (checkPiece(playerSquares)) {
        setVictory(player);
        return;
      }

      if (newSquares.every((r) => r.state !== "")) {
        setVictory("引き分け");
      }
    },
    [player1]
  );

  // プレイ処理(マス埋め)
  const putPiece = useCallback(
    (id: number, notCPU: boolean) => {
      // 勝敗が決まっていたら入力できない
      if (victory !== "") return;
      // CPUの手番はプレイヤーが入力できない
      if (vsCPU && player === player2 && notCPU) return;
      // 入力済みのマスは入力できない
      if (squares[id].state) return;
      // リセット直後なら状態の表示を消す
      if (reset) setReset(false);

      if (player === player1) {
        const newSquares: Square[] = squares.map((s) =>
          s.id === id ? { ...s, state: "○" } : s
        );
        setSquares(newSquares);
        checkVictory(player1, newSquares);
        setPlayer(player2);
      } else {
        const newSquares: Square[] = squares.map((s) =>
          s.id === id ? { ...s, state: "×" } : s
        );
        setSquares(newSquares);
        checkVictory(player2, newSquares);
        setPlayer(player1);
      }
    },
    [player1, player2, player, reset, squares, victory, checkVictory, vsCPU]
  );

  // CPUの自動マス埋め
  const CPUmove = useCallback(() => {
    const emptySquares = squares.filter((s) => s.state === "");
    if (emptySquares.length === 0) return;
    const choice =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    if (choice) putPiece(choice.id, false);
  }, [putPiece, squares]);

  // CPUの手番の時、CPUmoveを呼び出す
  useEffect(() => {
    if (vsCPU && player === player2 && victory === "") {
      const timer = setTimeout(() => {
        CPUmove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [player2, player, squares, vsCPU, reset, victory, CPUmove]);

  // リセットボタンの実装
  const handleReset = () => {
    setSquares(initialSquares);
    setPlayer(randomPlay());
    setVictory("");
    setReset(true);
    setVsCPU(false);
  };

  // CPUモードボタン
  const handleCPU = () => {
    setVsCPU(!vsCPU);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <div className={style.App}>
          <h2 className={style.h2}>三目並べゲーム</h2>
          <p>
            <input value={name1} onChange={(e) => setName1(e.target.value)} />：
            ○,
            {vsCPU ? (
              "CPU"
            ) : (
              <input value={name2} onChange={(e) => setName2(e.target.value)} />
            )}
            ： ×
            <button className={style.button} onClick={() => handleName()}>
              名前セット
            </button>
          </p>
          <div className={style.error}>
            {errorName.map((group, i) => (
              <div key={i}>
                {group.map((msg, j) => (
                  <span key={j} className={style.errortext}>
                    {msg}
                  </span>
                ))}
              </div>
            ))}
          </div>
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
        </div>
        <div>
          {/* 各行の要素をsquaresから取り出しつつ、ボタンを生成 */}
          {[0, 1, 2].map((row) => (
            <p key={row}>
              {squares.slice(row * 3, row * 3 + 3).map((square) => (
                <button
                  key={square.id}
                  onClick={() => putPiece(square.id, true)}
                >
                  {square.state}
                </button>
              ))}
            </p>
          ))}
          {/* CPUモードのON/OFFボタン */}
          <button onClick={handleCPU}>CPUモード</button>
          {/* リセットボタンの実装 */}
          <button onClick={handleReset}>リセット</button>
          {/* リセットボタンを押してから、対局が始まるまで表示される */}
          {reset && <p>リセットされました！</p>}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useCallback } from "react";
import type { Square } from "../types/types";
import initialSquares from "../utils/InitialSquares";
import isValid from "../utils/IsValid";
import canVictoryPlayer from "../utils/CanVictoryPlayer";


const useGame = () => {
  // 状態定義
  const [name1, setName1] = useState("Player1");
  const [name2, setName2] = useState("Player2");
  const [player1, setPlayer1] = useState(name1);
  const [player2, setPlayer2] = useState(name2);
  const [player, setPlayer] = useState("");
  const [squares, setSquares] = useState<Square[]>(initialSquares);
  const [victory, setVictory] = useState<string | "引き分け" | "">("");
  const [reset, setReset] = useState(false);
  const [vsCPU, setVsCPU] = useState(false);
  const [errorName, setErrorName] = useState<string[][]>([]);

  //Player1かPlayer2をランダムで返す
    const randomPlay = useCallback((): string => {
      return Math.random() < 0.5 ? player1 : player2;
    }, [player1, player2]);
  
    useEffect(() => {
      setPlayer(randomPlay());
    }, [randomPlay]);

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
  
    // 勝敗判定
    const checkVictory = useCallback(
      (player: string, newSquares: Square[]) => {
        const symbol = player === player1 ? "○" : "×";
        const playerSquares = newSquares.filter((s) => s.state === symbol);

        if (canVictoryPlayer(playerSquares)) {
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

    return {

        name1,
        name2,
        player1,
        player2,
        player,
        squares,
        victory,
        reset,
        vsCPU,
        errorName,
        setName1,
        setName2,
        setPlayer1,
        setPlayer2,
        putPiece,
        handleName,
        handleReset,
        handleCPU,
        nameValidation,
    }
};

export default useGame;

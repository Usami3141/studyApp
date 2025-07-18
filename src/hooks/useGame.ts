import * as yup from "yup";
import { useState, useEffect, useCallback } from "react";
import type { Square, Player, CurrentTurn, NameError } from "../types/GameTypes";
import {
  initialFirstPlayer,
  initialSecondPlayer,
} from "../constants/initialPlayers";
import initialSquares from "../utils/initialSquares";
import playerNameSchema from "../schemas/playerNameSchema";
import canVictory from "../utils/canVictory";

const useGame = () => {
  // 状態定義
  const [firstPlayer, setFirstPlayer] = useState<Player>(initialFirstPlayer);
  const [secondPlayer, setSecondPlayer] = useState<Player>(initialSecondPlayer);
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn>(null);
  const [boardSquares, setBoardSquares] = useState<Square[]>(initialSquares);
  const [victory, setVictory] = useState<string | "引き分け" | "">("");
  const [reset, setReset] = useState(false);
  const [vsCPU, setVsCPU] = useState(false);
  const [nameError, setNameError] = useState<NameError>({ firstPlayerName: [], secondPlayerName: [] });

  //firstPlayerかsecondPlayerをランダムで返す
  const randomPlay = useCallback((): string => {
    return Math.random() < 0.5 ? firstPlayer.name : secondPlayer.name;
  }, [firstPlayer.name, secondPlayer.name]);

  useEffect(() => {
    setCurrentTurn(randomPlay() as CurrentTurn);
  }, [randomPlay]);

  //プレイヤー名の入力チェック
  const nameValidation = async (preName: string): Promise<string[]> => {    
    try{
      await playerNameSchema.validate({preName}, {abortEarly: false});
      return [];
    }catch(error){
      if(error instanceof yup.ValidationError){
        return error.errors;        
      }else{
        return ["不明なエラーです。"];        
      }
    }

  };

  //プレイヤー名設定
  const handleName = async () => {
    if (boardSquares.some((s) => s.state !== "")) return;
    const firstPlayerNameError: string[] = await nameValidation(firstPlayer.preName);
    const secondPlayerNameError: string[] = await nameValidation(secondPlayer.preName);
    setNameError({ firstPlayerName: firstPlayerNameError, secondPlayerName: secondPlayerNameError });
  };

  // 勝敗判定
  const checkVictory = useCallback(
    (player: string, newSquares: Square[]) => {
      const symbol =
        currentTurn === firstPlayer.name
          ? firstPlayer.symbol
          : secondPlayer.symbol;
      const playerSquares = newSquares.filter((s) => s.state === symbol);

      if (canVictory(playerSquares)) {
        setVictory(player);
        return;
      }

      if (newSquares.every((r) => r.state !== "")) {
        setVictory("引き分け");
      }
    },
    [firstPlayer, secondPlayer, currentTurn]
  );

  // プレイ処理(マス埋め)
  const putPiece = useCallback(
    (id: number, notCPU: boolean) => {
      // 勝敗が決まっていたら入力できない
      if (victory !== "") return;
      // CPUの手番はプレイヤーが入力できない
      if (vsCPU && currentTurn === secondPlayer.name && notCPU) return;
      // 入力済みのマスは入力できない
      if (boardSquares[id].state) return;
      // リセット直後なら状態の表示を消す
      if (reset) setReset(false);

      if (currentTurn === firstPlayer.name) {
        const newSquares: Square[] = boardSquares.map((s) =>
          s.id === id ? { ...s, state: "○" } : s
        );
        setBoardSquares(newSquares);
        checkVictory(firstPlayer.name, newSquares);
        setCurrentTurn(secondPlayer.name);
      } else {
        const newSquares: Square[] = boardSquares.map((s) =>
          s.id === id ? { ...s, state: "×" } : s
        );
        setBoardSquares(newSquares);
        checkVictory(secondPlayer.name, newSquares);
        setCurrentTurn(firstPlayer.name);
      }
    },
    [
      firstPlayer,
      secondPlayer,
      currentTurn,
      reset,
      boardSquares,
      victory,
      checkVictory,
      vsCPU,
    ]
  );

  // CPUの自動マス埋め
  const CPUmove = useCallback(() => {
    const emptySquares = boardSquares.filter((s) => s.state === "");
    if (emptySquares.length === 0) return;
    const choice =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    if (choice) putPiece(choice.id, false);
  }, [putPiece, boardSquares]);

  // CPUの手番の時、CPUmoveを呼び出す
  useEffect(() => {
    if (vsCPU && currentTurn === secondPlayer.name && victory === "") {
      const timer = setTimeout(() => {
        CPUmove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [secondPlayer, currentTurn, boardSquares, vsCPU, reset, victory, CPUmove]);

  // リセットボタンの実装
  const handleReset = () => {
    setBoardSquares(initialSquares);
    setCurrentTurn(randomPlay());
    setVictory("");
    setReset(true);
    setVsCPU(false);
  };

  // CPUモードボタン
  const handleCPU = () => {
    setVsCPU(!vsCPU);
  };

  return {
    firstPlayer,
    secondPlayer,
    currentTurn,
    boardSquares,
    victory,
    reset,
    vsCPU,
    nameError,
    setFirstPlayer,
    setSecondPlayer,
    putPiece,
    handleName,
    handleReset,
    handleCPU,
  };
};

export default useGame;

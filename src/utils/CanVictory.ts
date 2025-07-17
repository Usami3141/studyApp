import type { Square } from "../types/GameTypes";

const canVictory = (result: Square[]): boolean => {
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

  //勝利条件に一致するか確認する関数
  return lines.some((line) =>
    line.every((id) => result.some((r) => r.id === id))
  );
};

export default canVictory;

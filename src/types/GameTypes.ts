type Square = {
  id: number;
  state: "○" | "×" | "";
};

type Player = {
  preName: string;
  name: string;
  symbol: "○" | "×";
}

type CurrentTurn =  string | null;

type NameError = {
  firstPlayerName: string[];
  secondPlayerName: string[];
}

export type { Square };
export type { Player };
export type { CurrentTurn };
export type { NameError };
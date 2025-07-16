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

export type { Square };
export type { Player };
export type { CurrentTurn };
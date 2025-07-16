import type { Square } from "../types/GameTypes";  

const InitialSquares = () => {
  const initialSquares: Square[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    state: "",
  }));
  return initialSquares;
};

export default InitialSquares;
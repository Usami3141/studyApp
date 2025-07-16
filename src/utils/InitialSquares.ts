import type { Square } from "../types/GameTypes";  

const initialSquares = () => {
  const initialSquares: Square[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    state: "",
  }));
  return initialSquares;
};

export default initialSquares;
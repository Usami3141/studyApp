import type { Square } from "../types/types";  

const InitialSquares = () => {
  const initialSquares: Square[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    state: "",
  }));
  return initialSquares;
};

export default InitialSquares;
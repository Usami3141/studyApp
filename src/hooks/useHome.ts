 import { useState, useEffect, } from "react";
 import { useLocation } from "react-router-dom";
 import loadvisitedCount from "../utils/loadVisitedCount";

 const useHome = () => {
 // 初期状態の設定
  const [count, setCount] = useState<number>(loadvisitedCount());
  const location = useLocation();

  // useEffectを使ってコンポーネントがマウントされたときにカウントを増やす
  useEffect(() => setCount(prevCount => prevCount! + 1), []);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return ({
    count,
    location,
 });

}

export default useHome;
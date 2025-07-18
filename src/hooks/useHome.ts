 import { useState, useEffect, } from "react";
 import { useLocation } from "react-router-dom";
 import supabase from "../lib/supabase";
 import loadvisitedCount from "../utils/loadVisitedCount";

 const useHome = () => {
 // 初期状態の設定
  const [count, setCount] = useState<number>(loadvisitedCount());
  const location = useLocation();

    useEffect(() => {
    const signInAnonymously = async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("匿名サインインエラー:", error.message);
      } else {
        console.log("匿名サインイン成功:", data?.user?.id);
      }
    };

    signInAnonymously();
  }, []);

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
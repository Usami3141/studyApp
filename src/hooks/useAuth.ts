// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ensureLogin = async () => {
      try {
        // 既存セッションの確認
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("セッション取得失敗:", sessionError.message);
          setLoading(false);
          return;
        }

        // 既にサインイン済みならそのIDを使用
        if (sessionData?.session?.user) {
          console.log("既存セッション:", sessionData.session.user.id);
          setUserId(sessionData.session.user.id);
          setLoading(false);
          return;
        }

        // サインインされていなければ匿名サインイン
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("匿名サインイン失敗:", error.message);
          setLoading(false);
          return;
        }

        if (data?.user?.id) {
          console.log("匿名サインイン成功:", data.user.id);
          setUserId(data.user.id);
        }
      } catch (e) {
        console.error("匿名サインイン例外:", e);
      } finally {
        setLoading(false);
      }
    };

    ensureLogin();
  }, []);

  return { userId, loading };
};

export default useAuth;
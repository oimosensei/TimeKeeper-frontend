import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useMutateAuth } from "../hooks/useMutateAuth";

export const Header2 = () => {
  const { user, setUser } = useUser(); // setUserはこのコンポーネントでは使用しないため削除
  const { logoutMutation } = useMutateAuth();

  const logout = () => {
    logoutMutation.mutate(); // ログアウト処理を実行
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">TimeKeeper</h1>
      <h2>{user?.email}</h2>
      <nav>
        <ul className="flex space-x-4">
          <li className="flex items-center">
            <Link to="/attendance" className="hover:text-gray-300" inline-block>
              出勤・退勤ページ
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/calendar" className="hover:text-gray-300">
              カレンダーページ
            </Link>
          </li>
          {user && (
            <li>
              {/* ログインしている場合、ログアウトボタンを表示 */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                ログアウト
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

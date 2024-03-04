import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { FaceSmileIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

export const Header2 = () => {
  const { user, setUser } = useUser(); // setUserはこのコンポーネントでは使用しないため削除
  const { logoutMutation } = useMutateAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    logoutMutation.mutate(); // ログアウト処理を実行
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <ul className="flex space-x-2">
        <li className="flex items-center">
          <FaceSmileIcon className="h-8 w-8" />
        </li>
        <li className="flex items-center">
          <h1 className="text-2xl font-semibold">TimeKeeper</h1>
        </li>
      </ul>
      {/* モバイルビューで表示*/}
      {/* ハンバーガーメニューボタン */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
        {isMenuOpen ? (
          <XMarkIcon className="h-8 w-8" /> // メニューが開いているときはバツアイコン
        ) : (
          <Bars3Icon className="h-8 w-8" /> // メニューが閉じているときはハンバーガーアイコン
        )}
      </button>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } fixed top-16 right-6 mt-2 py-2 w-40 z-10 bg-gray-700 rounded-lg shadow-xl`}
      >
        <ul className="flex flex-col">
          <li>
            <Link
              to="/attendance"
              className="block px-4 py-2 hover:bg-gray-600"
            >
              出勤・退勤ページ
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="block px-4 py-2 hover:bg-gray-600">
              カレンダーページ
            </Link>
          </li>
          {user && (
            <li>
              {/* ログアウトボタン */}
              <button
                onClick={logout}
                className="block px-4 py-2 text-left w-full hover:bg-gray-600"
              >
                ログアウト
              </button>
            </li>
          )}
        </ul>
      </div>
      {/* PCビューで表示*/}
      <nav className="hidden lg:block">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // 月を変更する関数
  const changeMonth = (offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  // 日付をクリックしたときの処理
  const handleDateClick = (date: number) => {
    navigate(`/date/${currentYear}/${currentMonth + 1}/${date}`);
  };

  // 簡単なカレンダーの生成（ここでは実装の簡略化のため固定）
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const dates = Array.from(
    { length: lastDay },
    (_, i) => new Date(currentYear, currentMonth, i + 1)
  );
  // 曜日を表す配列
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="flex flex-col items-center p-4 mx-auto max-w-md">
      <div className="flex justify-between w-full mb-4">
        <button onClick={() => changeMonth(-1)}>前の月</button>
        <span className="text-2xl font-bold">{`${currentYear}年 ${
          currentMonth + 1
        }月`}</span>
        <button onClick={() => changeMonth(1)}>次の月</button>
      </div>
      {/* 曜日を表示 */}
      <div className="grid grid-cols-7 gap-4 w-full">
        {weekdays.map((day) => (
          <div key={day} className="p-2 text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      {/* 日付を表示 */}
      <div className="grid grid-cols-7 gap-4 w-full">
        {/* 月の最初の日までの空の要素を追加 */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 border rounded-lg"></div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`p-2 border rounded-lg cursor-pointer text-center  ${
              isToday(date)
                ? "bg-yellow-300 hover:bg-yellow-400"
                : "bg-white-300 hover:bg-gray-400"
            } `}
            onClick={() => handleDateClick(date.getDate())}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

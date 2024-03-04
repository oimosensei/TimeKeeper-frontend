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

  // 日付をクリックしたときの処理
  const handleDateClick = (date: number) => {
    navigate(`/date/${currentYear}/${currentMonth + 1}/${date}`);
  };

  // 簡単なカレンダーの生成（ここでは実装の簡略化のため固定）
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: lastDay }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-4">
        <button onClick={() => changeMonth(-1)}>前の月</button>
        <span>{`${currentYear}年 ${currentMonth + 1}月`}</span>
        <button onClick={() => changeMonth(1)}>次の月</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {dates.map((date) => (
          <div
            key={date}
            className="p-2 border rounded-lg cursor-pointer text-center"
            onClick={() => handleDateClick(date)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

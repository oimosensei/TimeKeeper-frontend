import React, { useState, useEffect } from "react";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useMutateAttendance } from "../hooks/useMutateAttendance";
import { Attendance } from "../types";
import { toISOStringWithTimezone } from "../utils/dateUtil";
import { toast } from "react-hot-toast";

export const AttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user, setUser } = useUser();
  const { logoutMutation, getUserMutation } = useMutateAuth();
  const { getAttendanceAPI, updateAttendanceMutation, getAttendanceByDateAPI } =
    useMutateAttendance();
  const [attendance, setAttendance] = useState<Attendance>({} as Attendance);
  const navigate = useNavigate();

  const handleClockInButtonClick = () => {
    const now = new Date();
    const newAttendance: Omit<
      Attendance,
      "user_id" | "created_at" | "updated_at"
    > = {
      ...attendance,
      clock_in_time: now,
    };
    updateAttendanceMutation.mutate(newAttendance);
    toast.success("出勤しました");
  };

  const handleClockOutButtonClick = () => {
    const now = new Date();
    updateAttendanceMutation.mutate({ ...attendance, clock_out_time: now });
    toast.success("退勤しました");
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // 1秒ごとに時刻を更新

    return () => {
      clearInterval(timerId); // コンポーネントのアンマウント時にタイマーをクリア
    };
  }, []);

  useEffect(() => {
    getUserMutation.mutate();
    console.log(user);
  }, []);

  useEffect(() => {
    const today = new Date();
    try {
      getAttendanceByDateAPI(toISOStringWithTimezone(today).split("T")[0]).then(
        (data) => {
          setAttendance(data);
          console.log(data);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold">今日の日付: {dateString}</h1>
            <h2 className="text-lg">現在時刻: {timeString}</h2>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleClockInButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 h-10"
            >
              出勤
            </button>
            <button
              onClick={handleClockOutButtonClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-24 h-10"
            >
              退勤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

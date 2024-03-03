import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutateAttendance } from "../hooks/useMutateAttendance";
import { Attendance } from "../types";
import { log } from "console";
import { toast } from "react-hot-toast";
import { useAttendanceApi } from "../hooks/useAttendanceApi";
import { updateAttendanceApi } from "../api/attendanceApi";

interface DateDetail {
  clockInTime: Date;
  clockOutTime: Date;
  isHoliday: boolean;
}

export const DateDetailPage: React.FC = () => {
  interface RouteParams {
    year: string;
    month: string;
    day: string;
    [key: string]: string;
  }

  const { year, month, day } = useParams<RouteParams>();

  const [initialDetail, setInitialDetail] = useState<DateDetail>({
    clockInTime: new Date(),
    clockOutTime: new Date(),
    isHoliday: false,
  });

  const [detail, setDetail] = useState<DateDetail>({
    clockInTime: new Date(),
    clockOutTime: new Date(),
    isHoliday: false,
  });

  const [changedFields, setChangedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const { getAttendanceAPI, updateAttendanceMutation, getAttendanceByDateAPI } =
    useMutateAttendance();

  const { getAttendsanceByDate, updateAttendance } = useAttendanceApi();

  const [attendance, setAttendance] = useState<Attendance>({} as Attendance);

  useEffect(() => {
    const changes: { [key: string]: boolean } = {};
    if (detail.clockInTime.getTime() !== initialDetail.clockInTime.getTime()) {
      changes.clockInTime = true;
    }
    if (
      detail.clockOutTime.getTime() !== initialDetail.clockOutTime.getTime()
    ) {
      changes.clockOutTime = true;
    }
    if (detail.isHoliday !== initialDetail.isHoliday) {
      changes.isHoliday = true;
    }
    setChangedFields(changes);
  }, [detail, initialDetail]);

  useEffect(() => {
    try {
      getAttendsanceByDate(
        `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`
      ).then((data) => {
        if (!data) return;
        setAttendance(data);
        console.log(data);
        setDetail({
          clockInTime: new Date(data.clock_in_time),
          clockOutTime: new Date(data.clock_out_time),
          isHoliday: data.attendance,
        });
        setInitialDetail({
          clockInTime: new Date(data.clock_in_time),
          clockOutTime: new Date(data.clock_out_time),
          isHoliday: data.attendance,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setDetail((prev) => {
      // 入力タイプがtimeの場合、Dateオブジェクトを生成
      if (type === "time") {
        const [hours, minutes] = value.split(":").map(Number); // 入力値を時と分に分解
        const date = new Date((prev as any)[name] || new Date()); // 現在の値を基に新しいDateオブジェクトを生成、または新しい日付を使用
        date.setHours(hours + 9, minutes, 0, 0); // 時間と分を設定（秒とミリ秒は0にリセット）

        return { ...prev, [name]: date };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // フォーム送信時のイベントハンドラ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信を防止
    const newAttendance: Omit<
      Attendance,
      "user_id" | "created_at" | "updated_at"
    > = {
      ...attendance,
      clock_in_time: detail.clockInTime,
      clock_out_time: detail.clockOutTime,
      attendance: detail.isHoliday,
    };
    // updateAttendanceMutation.mutate(newAttendance);
    updateAttendanceApi(newAttendance);
    setInitialDetail(detail);
    toast.success("変更しました");
  };

  return (
    <div className="p-4 mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">
        {`${year}年${month}月${day}日`}
      </h1>
      <form onSubmit={handleSubmit} className="inline-block">
        <label
          className={`p-2 ${
            changedFields.clockInTime ? "bg-yellow-200" : ""
          } inline-block text-lg`}
        >
          出勤時間:
          <input
            type="time"
            name="clockInTime"
            value={detail.clockInTime.toISOString().slice(11, 16)}
            onChange={handleChange}
            className="ml-2 text-lg"
          />
        </label>
        <label
          className={`p-2 ${
            changedFields.clockOutTime ? "bg-yellow-200" : ""
          } inline-block text-lg`}
        >
          退勤時間:
          <input
            type="time"
            name="clockOutTime"
            value={detail.clockOutTime.toISOString().slice(11, 16)}
            onChange={handleChange}
            className="ml-2 text-lg"
          />
        </label>
        <label
          className={`p-2 ${
            changedFields.isHoliday ? "bg-yellow-200" : ""
          } inline-block text-lg`}
        >
          <input
            type="checkbox"
            name="isHoliday"
            checked={detail.isHoliday}
            onChange={handleChange}
          />
          休暇の日
        </label>
        <button
          type="submit"
          className={
            "ml-4 text-lg font-semibold px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-700 text-white disabled:opacity-50"
          }
          disabled={Object.keys(changedFields).length === 0}
        >
          変更
        </button>
      </form>
    </div>
  );
};

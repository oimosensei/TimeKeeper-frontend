import {
    updateAttendanceApi,
    getAttendanceByDateApi,
    deleteAttendanceApi,
    getAttendanceByIdApi,
    createAttendanceApi,
} from "../api/attendanceApi";
import { Attendance } from "../types";
import { toast } from "react-hot-toast";

export const useAttendanceApi = () => {
    const getAttendsanceByDate = async (date: string) => {
        try {
            return await getAttendanceByDateApi(date);
        } catch (e) {
            toast.error("出勤情報の取得に失敗しました");
        }
    };

    const updateAttendance = async (attendance: Omit<Attendance, "user_id" | "created_at" | "updated_at">) => {
        try {
            return await updateAttendanceApi(attendance);
        } catch (e) {
            toast.error("出勤情報の更新に失敗しました");
        }
    };

    const deleteAttendance = async (id: number) => {
        try {
            await deleteAttendanceApi(id);
        } catch (e) {
            toast.error("出勤情報の削除に失敗しました");
        }
    };

    const getAttendanceById = async (id: number) => {
        try {
            return await getAttendanceByIdApi(id);
        } catch (e) {
            toast.error("出勤情報の取得に失敗しました");
        }
    };

    const createAttendance = async (attendance: Omit<Attendance, "user_id" | "created_at" | "updated_at">) => {
        try {
            return await createAttendanceApi(attendance);
        } catch (e) {
            toast.error("出勤情報の作成に失敗しました");
        }
    };
    
    return {
        getAttendsanceByDate,
        updateAttendance,
        deleteAttendance,
        getAttendanceById,
       createAttendance,
    }
}

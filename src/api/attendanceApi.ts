import axios from 'axios';
import { Attendance } from '../types';

export const updateAttendanceApi = async (attendance: Omit<Attendance, "user_id" | "created_at" | "updated_at">) => {
    try {
        const { data } = await axios.put<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/${attendance.id}`, attendance);
        return data;
    } catch (e) {
        throw e;
    }
};

export const getAttendanceByDateApi = async (date: string) => {
    try {
        const { data } = await axios.get<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/date/${date}`);
        return data;
    } catch (e) {
        throw e;
    }
};

export const deleteAttendanceApi = async (id: number) => {
    try {
        await axios.delete<void>(`${process.env.REACT_APP_API_URL}/attendances/${id}`);
    } catch (e) {
        throw e;
    }
};

export const getAttendanceByIdApi = async (id: number) => {
    try {
        const { data } = await axios.get<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/${id}`);
        return data;
    } catch (e) {
        throw e;
    }
};

export const createAttendanceApi = async (attendance: Omit<Attendance, "user_id" | "created_at" | "updated_at">) => {
    try {
        const { data } = await axios.post<Attendance>(`${process.env.REACT_APP_API_URL}/attendances`, attendance);
        return data;
    } catch (e) {
        throw e;
    }
};
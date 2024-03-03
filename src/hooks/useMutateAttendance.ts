import axios from "axios";
import {  useMutation } from "@tanstack/react-query";
import { Attendance } from "../types";
import { useError } from "./useError";

export const useMutateAttendance = () => {
    const { switchErrorHandling } = useError();
   
    const createAttendanceMutation = useMutation(
        (attendance: Omit<Attendance, "id" | "user_id" | "created_at" | "updated_at">) =>
            axios.post<Attendance>(`${process.env.REACT_APP_API_URL}/attendances`, attendance),
        {
            onSuccess: (res) => {
                
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message);
                } else {
                    switchErrorHandling(err.response.data);
                }
            },
        }
    );
    const updateAttendanceMutation = useMutation(
        (attendance: Omit<Attendance, "user_id" | "created_at" | "updated_at">) =>
            axios.put<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/${attendance.id}`, attendance),
        {
            onSuccess: (res, variables) => {
                
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message);
                } else {
                    switchErrorHandling(err.response.data);
                }
            },
        }
    );

    const deleteAttendanceMutation = useMutation(
        (id: number) => axios.delete<void>(`${process.env.REACT_APP_API_URL}/attendances/${id}`),
        {
            onSuccess: () => {
                
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message);
                } else {
                    switchErrorHandling(err.response.data);
                }
            },
        }
    );

    const getAttendanceByIdAPI = async (id: number) => {
        try {
            const { data } = await axios.get<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/${id}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };

    const getAttendanceByDateAPI = async (date: string) => {
        try {
            const { data } = await axios.get<Attendance>(`${process.env.REACT_APP_API_URL}/attendances/date/${date}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };
        

    return { createAttendanceMutation, updateAttendanceMutation, deleteAttendanceMutation , getAttendanceAPI: getAttendanceByIdAPI, getAttendanceByDateAPI};
};

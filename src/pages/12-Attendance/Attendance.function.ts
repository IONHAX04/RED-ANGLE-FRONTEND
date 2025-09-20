import axios from "axios";
import type { Attendance } from "./Attendance.interface";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Punch In
export const punchIn = async (employee_id: number): Promise<Attendance> => {
  try {
    const response = await axios.post(
      `${API_URL}/attendance/punchIn`,
      { employee_id },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data; // { success, data: {...} }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to punch in"
    );
  }
};

// ✅ Punch Out
export const punchOut = async (employee_id: number): Promise<Attendance> => {
  try {
    const response = await axios.post(
      `${API_URL}/attendance/punchOut`,
      { employee_id },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to punch out"
    );
  }
};

// ✅ Get Attendance History (all for an employee)
export const getAttendanceHistory = async (
  employee_id: number
): Promise<Attendance[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/attendance/get?employeeId=${employee_id}`
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch attendance history"
    );
  }
};

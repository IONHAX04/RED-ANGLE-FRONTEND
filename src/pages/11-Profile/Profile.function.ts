import axios from "axios";
import type { Employee } from "../10-Employees/Employees.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const response = await axios.get(`${API_URL}/routes/employees/${id}`);
    return response.data.data; // assuming API response { success, data: {...} }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch employee"
    );
  }
};

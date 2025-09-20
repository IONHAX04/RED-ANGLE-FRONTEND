import axios from "axios";
import type { Employee } from "./Employees.interface";

// Example: Adjust baseURL to your backend API
const API_BASE_URL = "http://localhost:5000/api/v1/employees";

export const getEmployees = async (): Promise<{ data: Employee[] }> => {
  const response = await axios.get<{ data: Employee[] }>(API_BASE_URL);
  return response.data;
};

// You can later add more functions:
export const addEmployee = async (employee: Employee) => {
  return axios.post(API_BASE_URL, employee);
};

export const updateEmployee = async (
  id: number,
  employee: Partial<Employee>
) => {
  return axios.put(`${API_BASE_URL}/${id}`, employee);
};

export const deleteEmployee = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

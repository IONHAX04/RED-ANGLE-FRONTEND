import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addEmployee = async (employeeData: any) => {
  try {
    const response = await axios.post(`${API_URL}/routes/addEmployee`, employeeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    // Axios errors may be in response.data.message
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

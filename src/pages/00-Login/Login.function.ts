import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // your backend base URL

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${API_URL}/routes/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log('response', response)
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
};

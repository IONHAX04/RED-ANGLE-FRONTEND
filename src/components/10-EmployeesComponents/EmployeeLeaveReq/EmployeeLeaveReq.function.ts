import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllRequests = async () => {
  try {
    const url = `${API_URL}/request`;

    const response = await axios.get(url);
    return response.data; // { success: true, data: [...] }
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch requests";
    throw new Error(message);
  }
};

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateData = async (endpoint, data) => {
  const response = await axios.patch(`${API_URL}/${endpoint}`, data, {
    withCredentials: true,
  });
  return response.data;
};

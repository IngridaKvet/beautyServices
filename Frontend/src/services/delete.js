import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const deleteData = async (endpoint) => {
  const response = await axios.delete(`${API_URL}/${endpoint}`, {
    withCredentials: true,
  });
  return response.data;
};

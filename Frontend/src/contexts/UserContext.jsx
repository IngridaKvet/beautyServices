import { useState, useEffect } from "react";
import { UserContext } from "./contexts";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

// create context provider and export
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        setUser(null);
        console.log(error.message);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext value={{ user, setUser, loadingUser }}>{children}</UserContext>
  );
};

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../contexts/contexts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Adjust path to match your backend, e.g. /auth/logout or /users/logout
        await axios.post(
          `${API_URL}/users/logout`,
          {},
          { withCredentials: true }
        );
      } catch (e) {
        console.error(
          "Logout failed (ignoring):",
          e?.response?.data || e.message
        );
      } finally {
        // Clear client state/tokens
        setUser(null);
        localStorage.removeItem("accessToken"); // if you store any tokens
        sessionStorage.removeItem("accessToken");
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return <p>Logging you out…</p>;
}

import "./loginForm.css";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { UserContext } from "../../contexts/contexts";
import { NavLink, useNavigate } from "react-router";
import { postData } from "../../services/post";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //read userSetter from context
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      toast.success("Welcome back!");
      navigate("/procedures", { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await postData("users/login", formdata);
      const user1 = response.user;
      setUser(user1);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUser(null);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-layout">
      <h1 className="login-form__headline">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form__input">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="form__inputfield"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="form__inputfield"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="error__bar">{error}</div>
        <button type="submit" className="login-form__btn" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="form__footer">
        <p>Don't have an account?</p>
        <NavLink className="login-form__link" to="/signup" end>
          Sign up
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;

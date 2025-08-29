import "./signupForm.css";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { UserContext } from "../../contexts/contexts";
import { NavLink, useNavigate } from "react-router";
import { postData } from "../../services/post";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      toast.success("Account created successfully!");
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
      const response = await postData("users/register", formdata);
      const user1 = response.user;
      setUser(user1);
      setError(null);
    } catch (error) {
      setError(error.message);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-layout">
      <h1 className="signup-form__headline">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form__input">
          <label htmlFor="name">
            Name <span className="text-red-500"> *</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("username")}
            className="form__inputfield"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="form__input">
          <label htmlFor="email">
            Email<span className="text-red-500"> *</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="form__inputfield"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="form__input">
          <label htmlFor="pass">
            Password <span className="text-red-500"> *</span>
          </label>
          <input
            id="pass"
            type="password"
            {...register("password")}
            className="form__inputfield"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="form__input">
          <label htmlFor="passConf">
            Confirm password <span className="text-red-500"> *</span>
          </label>
          <input
            id="passConf"
            type="password"
            {...register("passwordconfirm")}
            className="form__inputfield"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="text-red-700">{error}</div>

        <button type="submit" className="signup-form__btn" disabled={loading}>
          {loading ? "Signing un..." : "Sign up"}
        </button>
      </form>
      <div className="form__footer">
        <p>Already have an account?</p>
        <NavLink className="signup-form__link" to="/login" end>
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default SignupForm;

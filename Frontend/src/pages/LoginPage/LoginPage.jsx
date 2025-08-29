import AuthHero from "../../components/AuthHero/AuthHero";
import LoginForm from "../../components/LoginForm/LoginForm";
import loginIllustration from "../../assets/login-illustration.png";

const LoginPage = () => {
  return (
    <div className="flex">
      <AuthHero illustration={loginIllustration} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;

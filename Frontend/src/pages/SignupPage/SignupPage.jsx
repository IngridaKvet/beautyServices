import AuthHero from "../../components/AuthHero/AuthHero";
import signupIllustration from "../../assets/signup-illustration.png";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex">
      <AuthHero illustration={signupIllustration} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;

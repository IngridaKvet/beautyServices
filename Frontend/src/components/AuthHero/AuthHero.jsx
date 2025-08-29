import './authHero.css';

const AuthHero = ({illustration}) => {
  return (
    <div className="auth-hero">
      <span className="auth-hero__logo">Tasky</span>
      <figure className="auth-hero__illustration">
        <img
          src={illustration}
          alt="illustration"
          className="auth-hero__image"
        />
      </figure>
    </div>
  );
};

export default AuthHero;
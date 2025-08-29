import "./fallbackC.css";
import errorImage from "../assets/error-illustration.png";

const FallbackC = ({ error, resetErrorBoundary }) => {
  const resetHandler = () => {
    resetErrorBoundary();
  };

  return (
    <div className="fallback-container" role="alert">
      <img
        src={errorImage}
        alt="Something went wrong"
        className="fallback-image"
      />
      <h2 className="alert__headline">Something went wrong</h2>
      <pre className="alert__text">{error.message}</pre>
      <button className="fallback-button" onClick={resetHandler}>
        Try again
      </button>
    </div>
  );
};

export default FallbackC;

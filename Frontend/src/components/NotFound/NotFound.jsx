import notFoundIllustration from "../../assets/not-found.svg";
import "./notFound.css";

const NotFound = () => {
  return (
    <>
      <img
        className="notFound__img"
        src={notFoundIllustration}
        alt="Error 404. Page not Found "
      />
      <p className="notFound_text">Not found</p>
    </>
  );
};

export default NotFound;

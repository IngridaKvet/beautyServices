import { NavLink } from "react-router";
import "./navigation.css";
import dashboardIcon from "../../assets/dashboard.png";
import logoutIcon from "../../assets/logout.png";
import loginIcon from "../../assets/login.png";
import registerIcon from "../../assets/signup.png";
import { UserContext } from "../../contexts/contexts";
import { useContext } from "react";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className="navigation">
        <div>
          <h1 className="navigation-logo">Tasky</h1>

          <NavLink className="nav-link" to="/procedures" end>
            <img src={dashboardIcon} alt="" className="nav-link__icon" />
            <p>Procedures</p>
          </NavLink>
        </div>
        <div className="auth-container">
          {user?.role === "admin" && (
            <NavLink className="nav-link" to="/admin">
              <img src={logoutIcon} alt="" className="nav-link__icon" />
              <p>Admin only</p>
            </NavLink>
          )}

          {user ? (
            <NavLink className="nav-link" to="/logout">
              <img src={logoutIcon} alt="" className="nav-link__icon" />
              <p>Log out</p>
            </NavLink>
          ) : (
            <>
              <NavLink className="nav-link" to="/signup">
                <img src={registerIcon} alt="" className="nav-link__icon" />
                <p>Sign up</p>
              </NavLink>
              <NavLink className="nav-link" to="/login">
                <img src={loginIcon} alt="" className="nav-link__icon" />
                <p>Log in</p>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

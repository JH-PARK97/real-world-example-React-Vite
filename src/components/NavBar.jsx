import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../store/store";

const Navbar = ({ userProfile }) => {
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));
  console.log(isLogin);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink activeclassname="active" className="navbar-brand" to="/" end>
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/" end>
              Home
            </NavLink>
          </li>
          {isLogin && (
            <>
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link" to="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/@${userProfile?.username}`}>
                  <img style={{ width: 24, height: 24, marginRight: 4, borderRadius: "50%" }} src={userProfile?.image} />
                  {userProfile?.username}
                </NavLink>
              </li>
            </>
          )}
          {!isLogin && (
            <>
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

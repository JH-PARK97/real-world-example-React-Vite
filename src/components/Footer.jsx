import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <NavLink to="/" className="logo-font">
          conduit
        </NavLink>
        <span className="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

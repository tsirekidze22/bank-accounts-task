import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-24">
          <Link to="/" className="fs-24 logo">
            Internet<span>Banking</span>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-8">
          <img
            src="/assets/icons/profile.svg"
            alt="profile"
            className="profile-icon"
          />
          <h4>John Doe</h4>
        </div>
      </div>
    </header>
  );
};

export default Header;

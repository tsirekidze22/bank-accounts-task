import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-24">
          <Link to="/">InternetBanking</Link>

          <nav className="nav d-flex align-items-center">
            <ul className="nav-list d-flex align-items-center gap-16">
              <li className="list-item">
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
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

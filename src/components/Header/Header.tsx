import React from "react";

const Header = () => {
  return (
    <header className="header d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-24">
          JobHunter
          <nav className="nav d-flex align-items-center">
            <ul className="nav-list d-flex align-items-center gap-16">
              <li className="list-item">
                <a href="">Home</a>
              </li>
              <li className="list-item">
                <a href="">Home</a>
              </li>
              <li className="list-item">
                <a href="">Home</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="d-flex sign-in-section gap-16">Balance: 1000Euro</div>
      </div>
    </header>
  );
};

export default Header;

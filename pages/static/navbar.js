import React from "react";

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg main-navbar w-100">
        <div className="container">
          <a className="navbar-brand fw-bold me-5 logoText" href="/">
            Marlayer
          </a>
          
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <a className="nav-item nav-link active p-3" href="#">
                Docs
              </a>
              <a className="nav-item nav-link active p-3" href="#">
                Showcase
              </a>
              <a className="nav-item nav-link active p-3" href="#">
                Use Cases
              </a>
            </div>
            <div className="navbar-nav ms-auto">
              <a className="nav-item nav-link active" href="/auth/register">
                <button className="btn btn-primary">Get Started</button>
              </a>
              <a className="nav-item nav-link active" href="/auth/login">
                <button className="btn btn-success">Login</button>
              </a>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
  );
};

export default Navbar;

import React from "react";

const navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Marlayer
          </a>
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
            <a className="nav-item nav-link active p-3" href="#">
                docs
              </a>
              <a className="nav-item nav-link active" href="#">
                <button className="btn btn-primary">Get Started</button>
              </a>
              <a className="nav-item nav-link active" href="#">
                <button className="btn btn-success">Login</button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbar;

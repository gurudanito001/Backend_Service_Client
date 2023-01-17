import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../static/navbar";

const verifyEmail = () => {
  return (
    <div>
      <Navbar />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "70vh" }}
      >
        <h2>Verify Email</h2>
      </div>
    </div>
  );
};

export default verifyEmail;

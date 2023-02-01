import React from "react";
import { useState } from "react";
import styles from "../../styles/auth.module.css";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import axios from "axios";
import config from "../../config";
import Navbar from "../static/navbar";

const login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessgae] = useState("");
  let [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const validateData = () => {
    let errors = {};
    if (data.password.length < 8) {
      errors.password = "8 character long password is required";
    }
    if (!isEmail(data.email)) {
      errors.email = "Valid email is required";
    }

    return errors;
  };

  const postData = () => {
    setIsLoading(true);
    axios
      .post(`${config.backendUrl}/clusters/create`, data)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data || error.message);
        setApiMessgae(error.response.data || error.message);
      });
  };

  const handleSubmit = () => {
    setErrors({});
    let result = validateData();
    if (Object.keys(result).length > 0) {
      return setErrors(result);
    }
    postData();
  };

  return (
    <div className={styles.pageContainer}>
      {/* <Navbar /> */}
      {apiMessage && (
        <div class="alert alert-primary" role="alert">
          {apiMessage}
        </div>
      )}
      <header className="mt-auto text-center">
        <a className="navbar-brand fw-bold logoText fs-3 " href="/">
          Marlayer
        </a>
      </header>
      <form className={styles.form}>
        <header className="mb-4">
          <h2 className="text-center mb-2">Login</h2>
          <p className="text-center">Please Enter Your Email and Password</p>
        </header>
        
        <div className="my-3">
          <label
            htmlFor="loginEmailInput"
            className="form-label small fw-bold"
          >
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            className="form-control"
            id="loginEmailInput"
          />
          <div className="small text-danger fw-light">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="loginPasswordInput"
            className="form-label small fw-bold"
          >
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={handleChange("password")}
            className="form-control"
            id="loginPasswordInput"
          />
          <div className="small text-danger fw-light">{errors.password}</div>
        </div>

        <div className="mb-3 mt-5 d-grid gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            {isLoading ? "logging in" : "Login"}
          </button>
        </div>
        <div className="text-center">
          <Link href="/auth/forgotPassword" className="text-success fw-bold">
            Forgot Password
          </Link>
          <br />
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-success fw-bold ">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default login;

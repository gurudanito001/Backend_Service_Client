import React from "react";
import { useState } from "react";
import styles from "../../styles/Register.module.css";
import "bootstrap/dist/css/bootstrap.css";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import config from "../../config";
import Navbar from "../static/navbar"

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
    <>
  <Navbar />
  {apiMessage &&   (<div class="alert alert-primary" role="alert">
        {apiMessage}
      </div>)}
      <div className={styles.container}>
        <form className={styles.form}>
          <div className="my-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label small fw-bold"
            >
              Email
            </label>
            <input 
              type="email"
              value={data.email}
              onChange={handleChange("email")}
              className="form-control"
              id="exampleFormControlInput1"
            />
            <div className="small text-danger fw-light">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label 
              htmlFor="exampleFormControlInput1"
              className="form-label small fw-bold"
            >
              Password
            </label>
            <input
              type="password"
              value={data.password}
              onChange={handleChange("password")}
              className="form-control"
              id="exampleFormControlInput1"
            />
            <div className="small text-danger fw-light">{errors.password}</div>
          </div>

          <div className="mb-3 mt-4 d-grid gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="btn btn-block btn-primary"
            >
              {isLoading ? "logging in" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default login;

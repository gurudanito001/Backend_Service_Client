import React from "react";
import { useState } from "react";
import styles from "../../styles/Register.module.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const resetPassword = () => {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    password: "",
  });
  console.log(data);
  const [isLoading, setIsLoading] = useState(null);
  let [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const validateData = () => {
    let errors = {};
    if (data.newPassword.length < 8) {
      errors.newPassword = "8 character long password is required";
    }

    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const postData = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:8080/clusters/create", data)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data || error.message);
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
    <div className={styles.container}>
      <form className={styles.form}>
        <div className="my-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            New Password
          </label>
          <input
            type="password"
            value={data.newPassword}
            onChange={handleChange("newPassword")}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">{errors.newPassword}</div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={data.confirmPassword}
            onChange={handleChange("confirmPassword")}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">
            {errors.confirmPassword}
          </div>
        </div>

      

        <div className="mb-3 mt-4 d-grid gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default resetPassword;

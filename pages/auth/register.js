import styles from "../../styles/Register.module.css";
import "bootstrap/dist/css/bootstrap.css";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

import { useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    multi_tenant: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  let [errors, setErrors] = useState({});
 

  const handleChange = (prop) => (event) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const handleChangeSwitch = () => {
    setData((prevState) => ({
      ...prevState,
      multi_tenant: !prevState.multi_tenant,
    }));
  };

  const validateData = () => {
    let errors = {};
    if (!data.name) {
      errors.name = "Cluster Name is Required";
    }
    if (data.password.length < 8) {
      errors.password = "8 character long password is required";
    }
    if (!data.description) {
      errors.description = "Description is required";
    }
    if (!isEmail(data.email)) {
      errors.email = "Valid email is required";
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
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Application Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Name of Application / Project"
          />
          <div className="small text-danger fw-light">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label small fw-bold"
          >
            Description
          </label>
          <textarea
            value={data.description}
            onChange={handleChange("description")}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          <div className="small text-danger fw-light">{errors.description}</div>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            value={data.multi_tenant}
            onChange={handleChangeSwitch}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
          />
          <label
            className="form-check-label small fw-bold"
            htmlFor="flexSwitchCheckChecked"
          >
            Multi-User
          </label>
          <div className="small text-danger fw-light">
            {errors.multi_tenant}
          </div>
        </div>
        {data.multi_tenant ? (
          <div className={styles.smallFont}>
            Your Frontend Application will have more than one user. It will
            require User Authentication flow.
          </div>
        ) : (
          <div className={styles.smallFont}>
            Your Frontend Application does not require multi-user access. There
            is no need for User Authentication.
          </div>
        )}

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
            {isLoading ? "Registering" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

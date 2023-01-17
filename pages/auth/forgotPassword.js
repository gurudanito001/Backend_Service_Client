import "bootstrap/dist/css/bootstrap.css";
import styles from "../../styles/Register.module.css";
import { useState } from "react";
import Navbar from "../static/navbar";
import isEmail from "validator/lib/isEmail";

const forgotPasword = () => {
  const [data, setData] = useState({
    email: "",
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
      {apiMessage && (
        <div class="alert alert-primary" role="alert">
          {apiMessage}
        </div>
      )}
      <div className={styles.container}>
        <form className={styles.form}>
        <h1>Register</h1>
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
    </>
  );
};

export default forgotPasword;

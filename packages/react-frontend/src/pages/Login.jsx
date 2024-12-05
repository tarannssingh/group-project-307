// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login(props) {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    totp: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setCreds({ ...creds, email: value });
        break;
      case "password":
        setCreds({ ...creds, password: value });
        break;
      case "totp":
        setCreds({ ...creds, totp: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds).then((isLoginSuccessful) => {
      if (isLoginSuccessful) {
        navigate("/");
      }
    });
    props.setMessage("");
    setCreds({...creds,email:"", password: "", totp: "" }); // Clear form fields
  }

  function changePage() {
    props.setMessage("");
  }

  return (
    <div className="auth-body">
      <div className="auth-form">
        <h2 className="auth-title">Login to PiggyPass</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={creds.email}
            onChange={handleChange}
            className="username"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={creds.password}
            onChange={handleChange}
            className="password"
          />

          <label htmlFor="email">2FA Code</label>
          <input
            type="number"
            name="totp"
            id="totp"
            value={creds.totp}
            onChange={handleChange}
            className="2FA"
          />

          <input
            type="button"
            value="Log In"
            onClick={submitForm}
            className="auth-button"
          />
          <p className="py-2">
            Do you need a PiggyPass Account?{" "}
            <Link to="/signup" className="auth-link" onClick={changePage}>
              Sign Up here!
            </Link>
          </p>
        </form>
        {/* Display the message here */}
        {props.message && (
          <p className="auth-message">{props.message}</p>
        )}
      </div>
    </div>
  );
}

export default Login;

// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    setCreds({ email: "", password: "", totp: "" }); // Clear form fields
  }

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={creds.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.password}
        onChange={handleChange}
      />

      <label htmlFor="email">2FA Code</label>
      <input
        type="number" //for styling purposes
        name="totp"
        id="totp"
        value={creds.totp}
        onChange={handleChange}
      />

      <input
        type="button"
        value="Log In"
        onClick={submitForm}
      />
      <p>
        Do you need a PiggyPass Account? <Link to="/signup">Sign Up here!</Link>
      </p>
    </form>
  );
}

export default Login;